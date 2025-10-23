import { Thermometer, Droplets, CloudRain, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface EnvironmentalFactorsProps {
  onFactorsChange?: (factors: {
    temperature: number;
    humidity: number;
    rainfall: string;
    soilType: string;
  }) => void;
}

export default function EnvironmentalFactors({ onFactorsChange }: EnvironmentalFactorsProps) {
  const [temperature, setTemperature] = useState([25]);
  const [humidity, setHumidity] = useState([60]);
  const [rainfall, setRainfall] = useState("");
  const [soilType, setSoilType] = useState("");

  useEffect(() => {
    onFactorsChange?.({
      temperature: temperature[0],
      humidity: humidity[0],
      rainfall,
      soilType,
    });
  }, [temperature, humidity, rainfall, soilType, onFactorsChange]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Environmental Factors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Temperature: {temperature[0]}°C
          </Label>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={0}
            max={50}
            step={1}
            data-testid="slider-temperature"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Humidity: {humidity[0]}%
          </Label>
          <Slider
            value={humidity}
            onValueChange={setHumidity}
            min={0}
            max={100}
            step={1}
            data-testid="slider-humidity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rainfall" className="flex items-center gap-2">
            <CloudRain className="h-4 w-4" />
            Rainfall (mm)
          </Label>
          <Input
            id="rainfall"
            type="number"
            placeholder="e.g., 50"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
            data-testid="input-rainfall"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="soil-type" className="flex items-center gap-2">
            <Sprout className="h-4 w-4" />
            Soil Type
          </Label>
          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger id="soil-type" data-testid="select-soil-type">
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clay">Clay</SelectItem>
              <SelectItem value="loam">Loam</SelectItem>
              <SelectItem value="sandy">Sandy</SelectItem>
              <SelectItem value="silt">Silt</SelectItem>
              <SelectItem value="peat">Peat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
