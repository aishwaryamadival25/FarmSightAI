import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";

interface AnalysisRecord {
  id: string;
  cropType: string;
  diseaseName: string;
  severity: "low" | "medium" | "high";
  date: string;
  thumbnail: string;
}

interface AnalysisHistoryProps {
  records: AnalysisRecord[];
  onViewDetails?: (id: string) => void;
}

export default function AnalysisHistory({ records, onViewDetails }: AnalysisHistoryProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-chart-1 text-white";
      case "medium":
        return "bg-chart-4 text-white";
      case "high":
        return "bg-chart-5 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Analysis</h2>
      <div className="grid gap-4">
        {records.map((record) => (
          <Card key={record.id} className="p-4 hover-elevate" data-testid={`card-analysis-${record.id}`}>
            <div className="flex items-center gap-4">
              <img
                src={record.thumbnail}
                alt={record.cropType}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">{record.diseaseName}</h3>
                    <p className="text-sm text-muted-foreground">{record.cropType}</p>
                  </div>
                  <Badge className={getSeverityColor(record.severity)}>
                    {record.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {record.date}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(record.id)}
                    data-testid={`button-view-${record.id}`}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
