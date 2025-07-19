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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-8">
        <h2 className="font-pixel text-3xl text-accent mb-8 pixel-text-glow">
          MEET
        </h2>
        <h1 className="font-pixel text-4xl text-primary mb-4 pixel-text-glow">
          {(customName.trim() || petName).toUpperCase()}!
        </h1>
        
        {/* Custom name input */}
        {!isCustomizing ? (
          <Button
            onClick={() => setIsCustomizing(true)}
            variant="outline"
            className="mb-8 font-pixel text-sm"
          >
            CHANGE NAME
          </Button>
        ) : (
          <div className="mb-8 max-w-xs mx-auto">
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
        
        {/* Pet creature */}
        <div className="w-48 h-48 mx-auto mb-8 relative">
          <div className="w-full h-full bg-primary rounded-full relative pixel-creature pulse-glow">
            {/* Multiple eyes */}
            <div className="absolute top-12 left-12 w-8 h-8 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full"></div>
            </div>
            <div className="absolute top-8 right-16 w-6 h-6 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-3 h-3 bg-background rounded-full"></div>
            </div>
            <div className="absolute top-16 right-8 w-7 h-7 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-3 h-3 bg-background rounded-full"></div>
            </div>
            
            {/* Tentacles */}
            <div className="absolute -top-4 left-20 w-3 h-12 bg-primary rounded-full wiggle"></div>
            <div className="absolute -top-2 right-20 w-3 h-8 bg-primary rounded-full wiggle" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute -left-4 top-24 w-12 h-3 bg-primary rounded-full wiggle" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute -right-4 top-20 w-8 h-3 bg-primary rounded-full wiggle" style={{animationDelay: '0.9s'}}></div>

            {/* Happy mouth */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-background rounded-full"></div>
            
            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent pulse-glow"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <p className="font-pixel text-sm text-muted-foreground mb-2">
          Feed them weird stuff
        </p>
        <p className="font-pixel text-sm text-muted-foreground mb-8">
          and watch what pops out!
        </p>
      </div>

      <Button 
        onClick={handleContinue}
        className="pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
      >
        TIME TO FEED YOUR BELLY!
      </Button>
    </div>
  );
};

export default MeetPetScreen;