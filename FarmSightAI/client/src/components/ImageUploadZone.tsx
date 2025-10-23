import { Upload, X, Camera } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadZoneProps {
  onImageSelect?: (file: File) => void;
}

export default function ImageUploadZone({ onImageSelect }: ImageUploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect?.(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-md p-12 text-center transition-colors ${
            isDragging ? "border-primary bg-accent" : "border-border"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-md bg-accent">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Upload Crop Image</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your image here, or use camera/gallery
              </p>
            </div>
            <div className="flex gap-2">
              <label htmlFor="file-upload">
                <Button variant="default" asChild data-testid="button-upload">
                  <span>Select Image</span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
              <Button 
                variant="secondary" 
                onClick={handleCameraCapture}
                data-testid="button-camera"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <input
                ref={cameraInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={handleFileInput}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-96 object-cover rounded-md"
            data-testid="img-preview"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
            data-testid="button-clear-image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
