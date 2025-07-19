import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface GameScreenProps {
  petName: string;
  weirdnessLevel: number;
  onFeedPet: () => void;
}

const GameScreen = ({ petName, weirdnessLevel, onFeedPet }: GameScreenProps) => {
  const [streak, setStreak] = useState(3);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header stats */}
      <div className="flex justify-between items-center mb-6">
        <div className="font-pixel text-sm text-accent">
          STREAK: {streak}
        </div>
        <div className="font-pixel text-lg text-primary pixel-text-glow">
          {petName.toUpperCase()}
        </div>
        <div className="font-pixel text-sm text-accent">
          LV.3
        </div>
      </div>

      {/* Poop Weirdness Meter */}
      <div className="mb-8">
        <div className="font-pixel text-sm text-accent mb-2 flex justify-between">
          <span>POOP WEIRDNESS</span>
          <span>{Math.round(weirdnessLevel)}/100</span>
        </div>
        <div className="relative">
          <Progress 
            value={weirdnessLevel} 
            className="h-4 bg-muted border-2 border-accent"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-80 rounded"></div>
        </div>
        <p className="font-pixel text-xs text-muted-foreground mt-1 text-center">
          {weirdnessLevel >= 100 ? "READY TO POOP!" : "NEED MORE FOOD TO POOP!"}
        </p>
      </div>

      {/* Main pet display */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <div className="w-64 h-64 mx-auto mb-8 relative">
          {/* Pet belly */}
          <div className="w-full h-full bg-primary rounded-full relative pixel-creature blob-bounce">
            {/* Multiple eyes looking around */}
            <div className="absolute top-16 left-16 w-10 h-10 bg-accent rounded-full">
              <div className="absolute top-2 left-2 w-4 h-4 bg-background rounded-full wiggle"></div>
            </div>
            <div className="absolute top-12 right-20 w-8 h-8 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full wiggle" style={{animationDelay: '0.5s'}}></div>
            </div>
            <div className="absolute top-20 right-12 w-9 h-9 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full wiggle" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Multiple tentacles waving */}
            <div className="absolute -top-6 left-24 w-4 h-16 bg-primary rounded-full wiggle"></div>
            <div className="absolute -top-4 right-24 w-4 h-12 bg-primary rounded-full wiggle" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute -left-6 top-28 w-16 h-4 bg-primary rounded-full wiggle" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute -right-6 top-24 w-12 h-4 bg-primary rounded-full wiggle" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute -bottom-6 left-28 w-4 h-16 bg-primary rounded-full wiggle" style={{animationDelay: '1.2s'}}></div>

            {/* Happy expression */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-background rounded-full"></div>
            
            {/* Sparkles */}
            {[...Array(25)].map((_, i) => (
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

        {/* Status text */}
        <p className="font-pixel text-sm text-muted-foreground mb-6 text-center">
          Your belly buddy is wiggling happily!
          <br />
          Ready for some weird food?
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-4">
        <Button 
          onClick={onFeedPet}
          className="w-full pixel-button text-xl py-6 hover:scale-105 transform transition-all"
        >
          FEED ME 🍴
        </Button>
        
        <div className="flex space-x-4">
          <Button 
            variant="secondary"
            className="flex-1 pixel-button text-sm py-3"
          >
            POOPDEX
          </Button>
          <Button 
            variant="secondary"
            className="flex-1 pixel-button text-sm py-3"
          >
            SETTINGS
          </Button>
        </div>
      </div>

      {/* Bottom navigation indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        <div className="w-2 h-2 bg-accent rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
};

export default GameScreen;