import { Progress } from "@/components/ui/progress";

interface ConfidenceScoreProps {
  score: number;
  label?: string;
}

export default function ConfidenceScore({ score, label = "Confidence" }: ConfidenceScoreProps) {
  const getColorClass = () => {
    if (score >= 80) return "bg-chart-1";
    if (score >= 60) return "bg-chart-4";
    return "bg-chart-5";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-mono font-semibold" data-testid="text-confidence-score">
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-2" data-testid="progress-confidence" />
    </div>
  );
}
