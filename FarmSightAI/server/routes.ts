import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import OpenAI from "openai";
import multer from "multer";
import { findBestMatchingDisease } from "./diseaseKnowledge";

// Generate random 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create JWT-like token (simplified for demo)
function createToken(phoneNumber: string): string {
  return Buffer.from(JSON.stringify({ phoneNumber, timestamp: Date.now() })).toString('base64');
}

// Decode token to get user info
function decodeToken(token: string): { phoneNumber: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return decoded;
  } catch {
    return null;
  }
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Send OTP to phone number
  app.post("/api/auth/send-otp", async (req, res) => {
    try {
      const { phoneNumber } = z.object({
        phoneNumber: z.string().min(10)
      }).parse(req.body);

      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await storage.saveOtp({
        phoneNumber,
        code: otp,
        expiresAt
      });

      // TODO: In production, send SMS via Twilio or similar service
      console.log(`📱 OTP for ${phoneNumber}: ${otp}`);

      res.json({ 
        success: true, 
        message: "OTP sent successfully",
        otp // Remove this in production!
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Verify OTP
  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { phoneNumber, otp } = z.object({
        phoneNumber: z.string(),
        otp: z.string().length(6)
      }).parse(req.body);

      const validOtp = await storage.getValidOtp(phoneNumber, otp);
      
      if (!validOtp) {
        return res.status(401).json({ error: "Invalid or expired OTP" });
      }

      // Delete used OTP
      await storage.deleteOtp(validOtp.id);

      // Create or get user
      let user = await storage.getUserByPhoneNumber(phoneNumber);
      if (!user) {
        user = await storage.createUser({ phoneNumber });
      }

      const token = createToken(phoneNumber);

      res.json({ 
        success: true,
        token,
        user: { id: user.id, phoneNumber: user.phoneNumber }
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Disease detection endpoint
  app.post("/api/analyze", upload.single('image'), async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const userInfo = decodeToken(token);
      if (!userInfo) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await storage.getUserByPhoneNumber(userInfo.phoneNumber);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const { cropType, temperature, humidity, rainfall, soilType } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!cropType) {
        return res.status(400).json({ error: "Crop type is required" });
      }

      // Convert image to base64
      const base64Image = imageFile.buffer.toString('base64');
      const imageUrl = `data:${imageFile.mimetype};base64,${base64Image}`;

      // Create environmental context for AI
      const environmentalContext = [];
      if (temperature) environmentalContext.push(`Temperature: ${temperature}°C`);
      if (humidity) environmentalContext.push(`Humidity: ${humidity}%`);
      if (rainfall) environmentalContext.push(`Rainfall: ${rainfall}mm`);
      if (soilType) environmentalContext.push(`Soil Type: ${soilType}`);

      const contextString = environmentalContext.length > 0 
        ? `\n\nEnvironmental conditions: ${environmentalContext.join(', ')}` 
        : '';

      // Analyze with OpenAI Vision
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert agricultural pathologist. Analyze this ${cropType} crop image for diseases. Describe any visible symptoms, disease indicators, or abnormalities you observe. Be specific about colors, patterns, locations, and severity of any issues. If the plant appears healthy, state that clearly.${contextString}`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500
      });

      const aiAnalysis = response.choices[0].message.content || "Unable to analyze image";
      
      // Find best matching disease from knowledge base
      const diseaseInfo = findBestMatchingDisease(cropType.toLowerCase(), aiAnalysis);

      // Determine severity based on AI description
      let severity: "low" | "medium" | "high" = "medium";
      const lowerAnalysis = aiAnalysis.toLowerCase();
      if (lowerAnalysis.includes("severe") || lowerAnalysis.includes("extensive") || lowerAnalysis.includes("critical")) {
        severity = "high";
      } else if (lowerAnalysis.includes("mild") || lowerAnalysis.includes("minor") || lowerAnalysis.includes("early")) {
        severity = "low";
      }

      // Extract confidence from AI or estimate
      let confidence = "75";
      if (lowerAnalysis.includes("likely") || lowerAnalysis.includes("appears to be")) {
        confidence = "85";
      } else if (lowerAnalysis.includes("possibly") || lowerAnalysis.includes("may be")) {
        confidence = "65";
      } else if (lowerAnalysis.includes("definitely") || lowerAnalysis.includes("clearly")) {
        confidence = "95";
      }

      // Create environmental impact statement
      const envImpact = environmentalContext.length > 0
        ? `Current conditions (${environmentalContext.join(', ')}) ${
            severity === "high" ? "create favorable conditions" : 
            severity === "medium" ? "moderately support" : 
            "minimally affect"
          } for ${diseaseInfo.name} development`
        : `Environmental conditions may contribute to ${diseaseInfo.name} development`;

      // Save analysis
      const analysis = await storage.saveAnalysis({
        userId: user.id,
        cropType,
        imageUrl,
        diseaseName: diseaseInfo.name,
        severity,
        confidence,
        symptoms: diseaseInfo.symptoms,
        causes: diseaseInfo.causes,
        treatment: diseaseInfo.treatment,
        environmentalImpact: envImpact,
        temperature: temperature || null,
        humidity: humidity || null,
        rainfall: rainfall || null,
        soilType: soilType || null
      });

      res.json({
        success: true,
        analysis: {
          id: analysis.id,
          diseaseName: analysis.diseaseName,
          severity: analysis.severity,
          confidence: parseInt(analysis.confidence),
          symptoms: analysis.symptoms,
          causes: analysis.causes,
          treatment: analysis.treatment,
          environmentalImpact: analysis.environmentalImpact,
          aiAnalysis
        }
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: error.message || "Analysis failed" });
    }
  });

  // Get analysis history
  app.get("/api/analyses", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const userInfo = decodeToken(token);
      if (!userInfo) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await storage.getUserByPhoneNumber(userInfo.phoneNumber);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const analyses = await storage.getAnalysesByUserId(user.id);

      res.json({
        success: true,
        analyses: analyses.map(a => ({
          id: a.id,
          cropType: a.cropType,
          diseaseName: a.diseaseName,
          severity: a.severity,
          confidence: parseInt(a.confidence),
          createdAt: a.createdAt,
          imageUrl: a.imageUrl
        }))
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analyses" });
    }
  });

  // Get single analysis
  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const analysis = await storage.getAnalysisById(req.params.id);
      
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json({
        success: true,
        analysis: {
          ...analysis,
          confidence: parseInt(analysis.confidence)
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
