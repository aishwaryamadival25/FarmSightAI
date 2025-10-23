import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ConfidenceScore from "./ConfidenceScore";
import { AlertCircle, Leaf, Pill } from "lucide-react";

interface DiseaseResult {
  diseaseName: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  environmentalImpact: string;
}

interface DiseaseResultCardProps {
  result: DiseaseResult;
  imageUrl?: string;
}

export default function DiseaseResultCard({ result, imageUrl }: DiseaseResultCardProps) {
  const getSeverityColor = () => {
    switch (result.severity) {
      case "low":
        return "bg-chart-1 text-white";
      case "medium":
        return "bg-chart-4 text-white";
      case "high":
        return "bg-chart-5 text-white";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {imageUrl && (
          <div className="bg-muted">
            <img
              src={imageUrl}
              alt="Analyzed crop"
              className="w-full h-full object-cover"
              data-testid="img-analyzed-crop"
            />
          </div>
        )}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold" data-testid="text-disease-name">
                {result.diseaseName}
              </h3>
              <Badge className={getSeverityColor()} data-testid="badge-severity">
                {result.severity}
              </Badge>
            </div>
            <ConfidenceScore score={result.confidence} />
          </div>

          <div className="bg-accent p-4 rounded-md">
            <p className="text-sm">
              <span className="font-semibold">Environmental Impact:</span>{" "}
              {result.environmentalImpact}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="symptoms">
              <AccordionTrigger data-testid="accordion-symptoms">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Symptoms
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {result.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="causes">
              <AccordionTrigger data-testid="accordion-causes">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Causes
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {result.causes.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="treatment">
              <AccordionTrigger data-testid="accordion-treatment">
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Treatment
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {result.treatment.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Card>
  );
}
