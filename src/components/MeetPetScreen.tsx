import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface MeetPetScreenProps {
  petName: string;
  onContinue: (customName?: string) => void;
}

const MeetPetScreen = ({ petName, onContinue }: MeetPetScreenProps) => {
  const [customName, setCustomName] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleContinue = () => {
    const finalName = customName.trim() || petName;
    onContinue(finalName);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="font-pixel text-2xl text-accent mb-4 pixel-text-glow">
          MEET
        </h2>
        <h1 className="font-pixel text-3xl text-primary mb-2 pixel-text-glow">
          {(customName.trim() || petName).toUpperCase()}!
        </h1>
        
        {/* Custom name input */}
        {!isCustomizing ? (
          <Button
            onClick={() => setIsCustomizing(true)}
            variant="outline"
            className="mb-4 font-pixel text-sm"
          >
            RENAME 📝
          </Button>
        ) : (
          <div className="mb-4 max-w-xs mx-auto">
            <Input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={petName}
              className="font-pixel text-center mb-4 bg-background border-2 border-accent focus:border-primary"
              maxLength={12}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setCustomName("");
                  setIsCustomizing(false);
                }}
                variant="outline"
                className="font-pixel text-xs flex-1"
              >
                CANCEL ❌
              </Button>
              <Button
                onClick={() => setIsCustomizing(false)}
                className="font-pixel text-xs flex-1"
              >
                OK! ✅
              </Button>
            </div>
          </div>
        )}
      </div>
        
      {/* HERO PET DISPLAY - Reduced to 70% size */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[45vh] max-h-[50vh]">
        <div className="w-full aspect-square max-w-[60vw] max-h-[42vh] relative">
          <div className="w-full h-full relative">
            <img 
              src="/lovable-uploads/d5bcdd78-dbeb-40d0-a5e2-f3237ae15ccf.png" 
              alt="Gut Pet"
              className="w-full h-full object-contain pixel-creature pulse-glow"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.3))'
              }}
            />
            
            {/* Floating sparkles around the pet */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[1.5%] h-[1.5%] bg-accent pulse-glow rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Tagline */}
        <div className="mt-4 text-center px-4">
          <p className="font-pixel text-sm text-muted-foreground">
            Feed me! See what happens! 🤪
          </p>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button 
          onClick={handleContinue}
          className="w-full max-w-md mx-auto block pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
        >
          CONTINUE! 🚀
        </Button>
      </div>
    </div>
  );
};

export default MeetPetScreen;