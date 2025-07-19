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
            CHANGE NAME
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
                CANCEL
              </Button>
              <Button
                onClick={() => setIsCustomizing(false)}
                className="font-pixel text-xs flex-1"
              >
                SAVE
              </Button>
            </div>
          </div>
        )}
      </div>
        
      {/* HERO PET DISPLAY - Reduced to 70% size */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[45vh] max-h-[50vh]">
        <div className="w-full aspect-square max-w-[60vw] max-h-[42vh] relative">
          <div className="w-full h-full bg-primary rounded-full relative pixel-creature pulse-glow">
            {/* Multiple eyes - responsive sizing */}
            <div className="absolute top-[20%] left-[20%] w-[10%] h-[10%] bg-accent rounded-full">
              <div className="absolute top-[15%] left-[15%] w-[50%] h-[50%] bg-background rounded-full"></div>
            </div>
            <div className="absolute top-[15%] right-[25%] w-[8%] h-[8%] bg-accent rounded-full">
              <div className="absolute top-[15%] left-[15%] w-[40%] h-[40%] bg-background rounded-full"></div>
            </div>
            <div className="absolute top-[25%] right-[15%] w-[9%] h-[9%] bg-accent rounded-full">
              <div className="absolute top-[15%] left-[15%] w-[40%] h-[40%] bg-background rounded-full"></div>
            </div>
            
            {/* Tentacles - responsive */}
            <div className="absolute -top-[5%] left-[30%] w-[3%] h-[15%] bg-primary rounded-full wiggle"></div>
            <div className="absolute -top-[3%] right-[30%] w-[3%] h-[12%] bg-primary rounded-full wiggle" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute -left-[5%] top-[35%] w-[15%] h-[3%] bg-primary rounded-full wiggle" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute -right-[5%] top-[30%] w-[12%] h-[3%] bg-primary rounded-full wiggle" style={{animationDelay: '0.9s'}}></div>

            {/* Happy mouth - responsive */}
            <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-[15%] h-[8%] bg-background rounded-full"></div>
            
            {/* Sparkles - responsive */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[1.5%] h-[1.5%] bg-accent pulse-glow"
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
          <p className="font-pixel text-sm text-muted-foreground mb-1">
            Feed them weird stuff
          </p>
          <p className="font-pixel text-sm text-muted-foreground">
            and watch what pops out!
          </p>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button 
          onClick={handleContinue}
          className="w-full max-w-md mx-auto block pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
        >
          TIME TO FEED YOUR BELLY!
        </Button>
      </div>
    </div>
  );
};

export default MeetPetScreen;