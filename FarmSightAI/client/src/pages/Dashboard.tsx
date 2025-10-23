import { useState } from "react";
import { Wheat, Apple, Carrot, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import CropCategoryCard from "@/components/CropCategoryCard";
import ImageUploadZone from "@/components/ImageUploadZone";
import EnvironmentalFactors from "@/components/EnvironmentalFactors";
import DiseaseResultCard from "@/components/DiseaseResultCard";
import AnalysisHistory from "@/components/AnalysisHistory";
import ThemeToggle from "@/components/ThemeToggle";

const cropCategories = [
  { id: "wheat", name: "Wheat", icon: Wheat, diseaseCount: 12 },
  { id: "rice", name: "Rice", icon: Wheat, diseaseCount: 10 },
  { id: "corn", name: "Corn", icon: Wheat, diseaseCount: 8 },
  { id: "tomato", name: "Tomato", icon: Apple, diseaseCount: 15 },
  { id: "potato", name: "Potato", icon: Carrot, diseaseCount: 11 },
];

interface AnalysisResult {
  id: string;
  diseaseName: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  environmentalImpact: string;
  imageUrl?: string;
}

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [envFactors, setEnvFactors] = useState({
    temperature: 25,
    humidity: 60,
    rainfall: "",
    soilType: ""
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Fetch analysis history
  const { data: historyData, refetch: refetchHistory } = useQuery({
    queryKey: ['/api/analyses'],
    enabled: true,
  });

  const handleStartAnalysis = () => {
    setShowUpload(true);
  };

  const handleImageSelect = (file: File) => {
    setUploadedImage(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage || !selectedCrop) {
      toast({
        title: "Missing Information",
        description: "Please select a crop type and upload an image",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      formData.append('cropType', selectedCrop);
      formData.append('temperature', envFactors.temperature.toString());
      formData.append('humidity', envFactors.humidity.toString());
      if (envFactors.rainfall) formData.append('rainfall', envFactors.rainfall);
      if (envFactors.soilType) formData.append('soilType', envFactors.soilType);

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      
      // Create image URL from uploaded file
      const imageUrl = URL.createObjectURL(uploadedImage);
      
      setAnalysisResult({
        ...data.analysis,
        imageUrl
      });

      toast({
        title: "Analysis Complete",
        description: `Detected: ${data.analysis.diseaseName}`,
      });

      // Refresh history
      refetchHistory();
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("phone_number");
    window.location.reload();
  };

  const phoneNumber = localStorage.getItem("phone_number");

  // Format history data
  const historyRecords = (historyData as any)?.analyses?.map((a: any) => ({
    id: a.id,
    cropType: a.cropType.charAt(0).toUpperCase() + a.cropType.slice(1),
    diseaseName: a.diseaseName,
    severity: a.severity,
    date: new Date(a.createdAt).toLocaleDateString(),
    thumbnail: a.imageUrl,
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">AgriScan AI</h1>
          <div className="flex items-center gap-2">
            {phoneNumber && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {phoneNumber}
              </span>
            )}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection onStartAnalysis={handleStartAnalysis} />

        <section>
          <h2 className="text-2xl font-bold mb-6">Select Crop Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cropCategories.map((crop) => (
              <CropCategoryCard
                key={crop.id}
                name={crop.name}
                icon={crop.icon}
                diseaseCount={crop.diseaseCount}
                isActive={selectedCrop === crop.id}
                onClick={() => setSelectedCrop(crop.id)}
              />
            ))}
          </div>
        </section>

        {showUpload && (
          <>
            <section>
              <h2 className="text-2xl font-bold mb-6">Upload Crop Image</h2>
              <ImageUploadZone onImageSelect={handleImageSelect} />
            </section>

            <section>
              <EnvironmentalFactors
                onFactorsChange={(factors) => setEnvFactors(factors)}
              />
            </section>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !uploadedImage || !selectedCrop}
                data-testid="button-analyze"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Disease"}
              </Button>
            </div>
          </>
        )}

        {analysisResult && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
            <DiseaseResultCard
              result={analysisResult}
              imageUrl={analysisResult.imageUrl}
            />
          </section>
        )}

        {historyRecords.length > 0 && (
          <section>
            <AnalysisHistory
              records={historyRecords}
              onViewDetails={(id) => console.log("View details:", id)}
            />
          </section>
        )}
      </main>
    </div>
  );
}
