# AgriScan AI - Crop Disease Detection App

## Overview
AI-powered crop disease detection system that analyzes crop images with environmental context to identify diseases across 5 crop categories: Wheat, Rice, Corn, Tomato, and Potato.

## Recent Changes (Latest First)

### 2024-10-17: Phone Authentication System
- Added phone number + OTP login system
- Created PhoneLogin and OtpVerification components
- Updated schema to support phone-based authentication
- Implemented OTP generation and verification in backend
- **Note**: Currently using simulated SMS (OTPs logged to console). For production, integrate Twilio or similar SMS service for real OTP delivery.

### 2024-10-17: Camera Capture & UI Updates
- Added camera capture functionality to ImageUploadZone
- Removed season field from environmental factors
- Users can now capture images directly from device camera

### 2024-10-17: Initial Prototype
- Built complete frontend design with agricultural theme
- Created reusable components for crop detection workflow
- Implemented hero section, crop category selection, image upload, environmental factors input
- Added disease result display and analysis history components
- Configured green/earth-tone color scheme with dark mode support

## Project Architecture

### Frontend (React + TypeScript)
- **Pages**: Dashboard, Login
- **Key Components**:
  - PhoneLogin: Phone number input for authentication
  - OtpVerification: OTP verification UI
  - HeroSection: Landing hero with CTA
  - CropCategoryCard: Crop type selection
  - ImageUploadZone: Drag-drop + camera capture
  - EnvironmentalFactors: Temperature, humidity, rainfall, soil type inputs
  - DiseaseResultCard: AI analysis results display
  - AnalysisHistory: Previous analysis records

### Backend (Express.js)
- **Auth Routes**:
  - POST `/api/auth/send-otp`: Generate and send OTP
  - POST `/api/auth/verify-otp`: Verify OTP and create session
- **Storage**: In-memory storage for users and OTP codes

### Data Models
- **User**: id, phoneNumber, createdAt
- **OtpCode**: id, phoneNumber, code, expiresAt, createdAt

## Technology Stack
- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI
- Backend: Express.js, Node.js
- Styling: Agricultural theme (green: 125 45% 35%, earth tones)
- Icons: Lucide React
- State: React Query for data fetching

## Environment Variables
- `OPENAI_API_KEY`: For AI image analysis (not yet implemented)
- `SESSION_SECRET`: For session management

## User Preferences
- Clean, professional agricultural design
- Mobile-first with camera capture support
- Phone-based authentication (no passwords)

## Next Steps
1. Integrate OpenAI Vision API for actual disease detection
2. Add real SMS service (Twilio) for OTP delivery
3. Implement disease database with 5 crop categories
4. Add analysis history persistence
5. Create treatment recommendation system
