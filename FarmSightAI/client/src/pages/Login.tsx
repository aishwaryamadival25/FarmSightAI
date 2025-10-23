import { useState } from "react";
import PhoneLogin from "@/components/PhoneLogin";
import OtpVerification from "@/components/OtpVerification";

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOtpSent = (phone: string) => {
    setPhoneNumber(phone);
    setStep("otp");
  };

  const handleVerified = (token: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("phone_number", phoneNumber);
    onLogin(token);
  };

  const handleBack = () => {
    setStep("phone");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === "phone" ? (
          <PhoneLogin onOtpSent={handleOtpSent} />
        ) : (
          <OtpVerification
            phoneNumber={phoneNumber}
            onVerified={handleVerified}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
