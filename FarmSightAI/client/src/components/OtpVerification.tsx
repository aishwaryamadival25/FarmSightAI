import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OtpVerificationProps {
  phoneNumber: string;
  onVerified: (token: string) => void;
  onBack: () => void;
}

export default function OtpVerification({
  phoneNumber,
  onVerified,
  onBack,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      const data = await response.json();
      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });
      
      onVerified(data.token);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) throw new Error("Failed to resend OTP");

      const data = await response.json();
      toast({
        title: "OTP Resent",
        description: `New verification code sent to ${phoneNumber}`,
      });
      
      console.log("New OTP for testing:", data.otp);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Verify OTP</h2>
          <p className="text-muted-foreground mt-2">
            Enter the 6-digit code sent to
          </p>
          <p className="font-semibold">{phoneNumber}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              data-testid="input-otp"
              className="text-center text-2xl tracking-widest font-mono"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={isLoading}
            data-testid="button-verify-otp"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="flex items-center justify-between text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Change Number
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOtp}
              data-testid="button-resend"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
