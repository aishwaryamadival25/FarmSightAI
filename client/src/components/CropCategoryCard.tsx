import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CropCategoryCardProps {
  name: string;
  icon: LucideIcon;
  diseaseCount: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CropCategoryCard({
  name,
  icon: Icon,
  diseaseCount,
  isActive = false,
  onClick,
}: CropCategoryCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer hover-elevate active-elevate-2 transition-all ${
        isActive ? "border-primary bg-accent" : ""
      }`}
      onClick={onClick}
      data-testid={`card-crop-${name.toLowerCase()}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`p-3 rounded-md ${isActive ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-base">{name}</h3>
          <p className="text-sm text-muted-foreground">{diseaseCount} diseases</p>
        </div>
      </div>
    </Card>
  );
}
