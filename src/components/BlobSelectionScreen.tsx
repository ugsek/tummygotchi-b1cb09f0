import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Blob {
  id: string;
  name: string;
  color: string;
  pattern: string;
}

interface BlobSelectionScreenProps {
  onBlobSelect: (blobId: string) => void;
  onSkip: () => void;
}

const blobs: Blob[] = [
  {
    id: "sploosh",
    name: "SPLOOSH",
    color: "bg-primary",
    pattern: "sparkly"
  },
  {
    id: "squirm", 
    name: "SQUIRM",
    color: "bg-purple-600",
    pattern: "slimy"
  },
  {
    id: "fizz",
    name: "FIZZ", 
    color: "bg-blue-600",
    pattern: "fuzzy"
  }
];

const BlobSelectionScreen = ({ onBlobSelect, onSkip }: BlobSelectionScreenProps) => {
  const [selectedBlob, setSelectedBlob] = useState<string | null>(null);

  const handleBlobClick = (blobId: string) => {
    setSelectedBlob(blobId);
  };

  const handleConfirm = () => {
    if (selectedBlob) {
      onBlobSelect(selectedBlob);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-8">
        <h2 className="font-pixel text-xl md:text-2xl text-accent mb-4">
          PICK YOUR BLOB! 👆
        </h2>
        <p className="font-pixel text-sm text-muted-foreground">
          Which one looks coolest?
        </p>
      </div>

      {/* Blob pods */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div
          className={`cursor-pointer transform transition-all duration-300 ${
            selectedBlob === 'sploosh' ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={() => handleBlobClick('sploosh')}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/3a2d946e-5d45-4a18-be38-1292ce12eb11.png" 
              alt="SPLOOSH Pod"
              className="w-24 h-32 object-contain pixel-creature"
              style={{
                imageRendering: 'pixelated',
                filter: selectedBlob === 'sploosh' ? 'drop-shadow(0 0 20px hsl(var(--accent) / 0.6))' : 'none'
              }}
            />
            {/* Selection indicator */}
            {selectedBlob === 'sploosh' && (
              <div className="absolute -inset-2 border-4 border-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>

        <div
          className={`cursor-pointer transform transition-all duration-300 ${
            selectedBlob === 'squirm' ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={() => handleBlobClick('squirm')}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/3a2d946e-5d45-4a18-be38-1292ce12eb11.png" 
              alt="SQUIRM Pod"
              className="w-24 h-32 object-contain pixel-creature"
              style={{
                imageRendering: 'pixelated',
                filter: selectedBlob === 'squirm' ? 'drop-shadow(0 0 20px hsl(var(--accent) / 0.6))' : 'none',
                transform: 'scaleX(-1)' // Flip horizontally for variation
              }}
            />
            {/* Selection indicator */}
            {selectedBlob === 'squirm' && (
              <div className="absolute -inset-2 border-4 border-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>

        <div
          className={`cursor-pointer transform transition-all duration-300 ${
            selectedBlob === 'fizz' ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={() => handleBlobClick('fizz')}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/3a2d946e-5d45-4a18-be38-1292ce12eb11.png" 
              alt="FIZZ Pod"
              className="w-24 h-32 object-contain pixel-creature"
              style={{
                imageRendering: 'pixelated',
                filter: selectedBlob === 'fizz' ? 'drop-shadow(0 0 20px hsl(var(--accent) / 0.6))' : 'none',
                transform: 'rotate(10deg)' // Slight rotation for variation
              }}
            />
            {/* Selection indicator */}
            {selectedBlob === 'fizz' && (
              <div className="absolute -inset-2 border-4 border-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        {selectedBlob && (
          <Button 
            onClick={handleConfirm}
            className="pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
          >
            PICK! 👍
          </Button>
        )}
        
        <Button 
          onClick={onSkip}
          variant="outline"
          className="pixel-button text-sm py-2 px-6 hover:scale-105 transform transition-all"
        >
          RANDOM! 🎲
        </Button>
      </div>
    </div>
  );
};

export default BlobSelectionScreen;