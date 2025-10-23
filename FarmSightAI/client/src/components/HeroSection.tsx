import heroImage from "@assets/generated_images/Healthy_crop_field_panorama_98770525.png";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

interface HeroSectionProps {
  onStartAnalysis?: () => void;
}

export default function HeroSection({ onStartAnalysis }: HeroSectionProps) {
  return (
    <div className="relative h-80 md:h-96 rounded-md overflow-hidden">
      <img
        src={heroImage}
        alt="Healthy crop field"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Crop Disease Detection
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Analyze crop health with advanced AI technology and environmental context.
              Detect diseases early and protect your harvest.
            </p>
            <Button
              size="lg"
              variant="default"
              onClick={onStartAnalysis}
              data-testid="button-start-analysis"
              className="gap-2"
            >
              <Scan className="h-5 w-5" />
              Start Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
