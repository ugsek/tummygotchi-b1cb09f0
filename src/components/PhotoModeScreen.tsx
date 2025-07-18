import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface PhotoModeScreenProps {
  onPhotoTaken: (imageData: string) => void;
}

const PhotoModeScreen = ({ onPhotoTaken }: PhotoModeScreenProps) => {
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageData(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    if (imageData) {
      onPhotoTaken(imageData);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-2xl font-pixel text-foreground mb-8 text-center pixel-text-glow">
        PHOTO MODE
      </h1>

      {/* Camera viewfinder area */}
      <div className="w-full max-w-md aspect-square border-4 border-accent bg-card mb-8 relative overflow-hidden">
        {imageData ? (
          <img 
            src={imageData} 
            alt="Captured meal" 
            className="w-full h-full object-cover pixel-creature"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-sm font-pixel text-foreground mb-4 text-center">
              SNAP YOUR MEAL!
            </p>
            
            {/* Viewfinder frame corners */}
            <div className="relative w-32 h-32">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent"></div>
              
              {/* Center camera icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
        
        {/* Pet character in corner */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow">
            <div className="text-xs text-primary-foreground">👁️</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-4 w-full max-w-md">
        {!imageData ? (
          <Button
            onClick={handleTakePhoto}
            className="w-full h-16 text-lg font-pixel pixel-button flex items-center justify-center gap-4"
          >
            <Camera className="w-6 h-6" />
            TAKE PHOTO
          </Button>
        ) : (
          <>
            <Button
              onClick={handleConfirm}
              className="w-full h-16 text-lg font-pixel pixel-button"
            >
              ANALYZE MEAL
            </Button>
            <Button
              onClick={() => setImageData(null)}
              variant="outline"
              className="w-full h-12 text-sm font-pixel"
            >
              RETAKE PHOTO
            </Button>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoModeScreen;