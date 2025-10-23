import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhoneLoginProps {
  onOtpSent: (phoneNumber: string) => void;
}

export default function PhoneLogin({ onOtpSent }: PhoneLoginProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      const data = await response.json();
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${phoneNumber}`,
      });
      
      console.log("OTP for testing:", data.otp);
      onOtpSent(phoneNumber);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-4">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Welcome to AgriScan AI</h2>
          <p className="text-muted-foreground mt-2">
            Enter your phone number to get started
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              data-testid="input-phone"
            />
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleSendOtp}
            disabled={isLoading}
            data-testid="button-send-otp"
          >
            {isLoading ? "Sending..." : "Send OTP"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
