import { Button } from "@/components/ui/button";
import { Camera, Smile } from "lucide-react";

interface FoodModeSelectionScreenProps {
  petName: string;
  onSelectEmojiTap: () => void;
  onSelectPhotoMode: () => void;
}

const FoodModeSelectionScreen = ({ petName, onSelectEmojiTap, onSelectPhotoMode }: FoodModeSelectionScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Pet character */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
          {/* Eyes */}
          <div className="absolute top-6 left-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-6 right-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-8 w-6 h-3 bg-background rounded-full"></div>
          
          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 text-accent font-pixel text-lg animate-pulse"
              style={{
                left: `${-20 + Math.random() * 140}%`,
                top: `${-20 + Math.random() * 140}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              +
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-pixel text-foreground mb-2 text-center pixel-text-glow">
        HOW DO YOU WANT
      </h1>
      <h2 className="text-2xl font-pixel text-foreground mb-8 text-center pixel-text-glow">
        TO LOG FOOD?
      </h2>

      {/* Action buttons */}
      <div className="space-y-4 w-full max-w-md">
        <Button
          onClick={onSelectEmojiTap}
          className="w-full h-16 text-lg font-pixel pixel-button flex items-center justify-center gap-4"
        >
          <Smile className="w-6 h-6" />
          EMOJI TAP
        </Button>

        <Button
          onClick={onSelectPhotoMode}
          className="w-full h-16 text-lg font-pixel pixel-button flex items-center justify-center gap-4"
        >
          <Camera className="w-6 h-6" />
          PHOTO MODE
        </Button>
      </div>
    </div>
  );
};

export default FoodModeSelectionScreen;