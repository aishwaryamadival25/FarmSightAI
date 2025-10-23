import { type User, type InsertUser, type OtpCode, type InsertOtp, type Analysis, type InsertAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveOtp(otp: InsertOtp): Promise<OtpCode>;
  getValidOtp(phoneNumber: string, code: string): Promise<OtpCode | undefined>;
  deleteOtp(id: string): Promise<void>;
  saveAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysesByUserId(userId: string): Promise<Analysis[]>;
  getAnalysisById(id: string): Promise<Analysis | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private otpCodes: Map<string, OtpCode>;
  private analyses: Map<string, Analysis>;

  constructor() {
    this.users = new Map();
    this.otpCodes = new Map();
    this.analyses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phoneNumber === phoneNumber,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async saveOtp(insertOtp: InsertOtp): Promise<OtpCode> {
    const id = randomUUID();
    const otp: OtpCode = {
      ...insertOtp,
      id,
      createdAt: new Date()
    };
    this.otpCodes.set(id, otp);
    return otp;
  }

  async getValidOtp(phoneNumber: string, code: string): Promise<OtpCode | undefined> {
    return Array.from(this.otpCodes.values()).find(
      (otp) => 
        otp.phoneNumber === phoneNumber && 
        otp.code === code && 
        otp.expiresAt > new Date()
    );
  }

  async deleteOtp(id: string): Promise<void> {
    this.otpCodes.delete(id);
  }

  async saveAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      ...insertAnalysis,
      id,
      temperature: insertAnalysis.temperature ?? null,
      humidity: insertAnalysis.humidity ?? null,
      rainfall: insertAnalysis.rainfall ?? null,
      soilType: insertAnalysis.soilType ?? null,
      createdAt: new Date()
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysesByUserId(userId: string): Promise<Analysis[]> {
    return Array.from(this.analyses.values())
      .filter((analysis) => analysis.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getAnalysisById(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }
}

export const storage = new MemStorage();
