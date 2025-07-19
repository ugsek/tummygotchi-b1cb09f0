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
          PICK THE ONE
        </h2>
        <h2 className="font-pixel text-xl md:text-2xl text-accent mb-6">
          THAT FEELS RIGHT
        </h2>
        <p className="font-pixel text-sm text-muted-foreground mb-2">
          Your belly brewed 3
        </p>
        <p className="font-pixel text-sm text-muted-foreground">
          weird blobs overnight.
        </p>
      </div>

      {/* Blob pods */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className={`cursor-pointer transform transition-all duration-300 ${
              selectedBlob === blob.id ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={() => handleBlobClick(blob.id)}
          >
            <div className="relative">
              {/* Pod container */}
              <div className={`w-24 h-32 ${blob.color} rounded-full relative overflow-hidden pixel-creature ${
                selectedBlob === blob.id ? 'pulse-glow' : ''
              }`}>
                {/* Pattern effects */}
                {blob.pattern === 'sparkly' && (
                  [...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-accent pulse-glow"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))
                )}
                
                {blob.pattern === 'slimy' && (
                  <div className="absolute inset-2 bg-gradient-to-b from-purple-400 to-purple-800 rounded-full opacity-70"></div>
                )}
                
                {blob.pattern === 'fuzzy' && (
                  [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full wiggle"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${Math.random() * 1}s`
                      }}
                    />
                  ))
                )}

                {/* Selection indicator */}
                {selectedBlob === blob.id && (
                  <div className="absolute -inset-2 border-4 border-accent rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        {selectedBlob && (
          <Button 
            onClick={handleConfirm}
            className="pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
          >
            PICK THIS
          </Button>
        )}
        
        <Button 
          onClick={onSkip}
          variant="outline"
          className="pixel-button text-sm py-2 px-6 hover:scale-105 transform transition-all"
        >
          SKIP TO GAME
        </Button>
      </div>
    </div>
  );
};

export default BlobSelectionScreen;