import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface GameScreenProps {
  petName: string;
  weirdnessLevel: number;
  daysLogged: number;
  onFeedPet: () => void;
}

const GameScreen = ({ petName, weirdnessLevel, daysLogged, onFeedPet }: GameScreenProps) => {
  const [streak, setStreak] = useState(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Weirdness Meter - Always visible at top */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-accent/20 p-4 z-10">
        <div className={`${weirdnessLevel >= 100 ? 'animate-pulse' : ''}`}>
          <div className="font-pixel text-sm text-accent mb-2 flex justify-between">
            <span>POOP WEIRDNESS</span>
            <span>{Math.round(weirdnessLevel)}/100</span>
          </div>
          <div className={`relative ${weirdnessLevel >= 100 ? 'animate-bounce' : ''}`}>
            <Progress 
              value={Math.min(weirdnessLevel, 100)} 
              className={`h-4 bg-muted border-2 border-accent ${
                weirdnessLevel >= 100 
                  ? 'shadow-lg shadow-accent/50 border-accent animate-pulse' 
                  : ''
              }`}
            />
            
            {/* Sparkle effects when ready */}
            {weirdnessLevel >= 100 && (
              <>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${-50 + Math.random() * 150}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </>
            )}
          </div>
          <p className={`font-pixel text-xs mt-1 text-center ${
            weirdnessLevel >= 100 
              ? 'text-accent text-lg animate-bounce pixel-text-glow' 
              : 'text-muted-foreground'
          }`}>
            {weirdnessLevel >= 100 ? "🎉 AUTO-POOPING IN 2 SECONDS! 💩✨" : 
             "EAT MORE HEALTHY FOOD TO FILL THE METER!"}
          </p>
        </div>
      </div>

      {/* Main content area - Center the pet */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* HERO PET DISPLAY - Centered */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full aspect-square max-w-[60vw] max-h-[42vh] relative">
            {/* Pet belly - Hero size reduced to 70% */}
            <div className="w-full h-full bg-primary rounded-full relative pixel-creature blob-bounce">
              {/* Multiple eyes looking around - responsive sizing */}
              <div className="absolute top-[15%] left-[15%] w-[12%] h-[12%] bg-accent rounded-full">
                <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-background rounded-full wiggle"></div>
              </div>
              <div className="absolute top-[10%] right-[20%] w-[10%] h-[10%] bg-accent rounded-full">
                <div className="absolute top-[15%] left-[15%] w-[50%] h-[50%] bg-background rounded-full wiggle" style={{animationDelay: '0.5s'}}></div>
              </div>
              <div className="absolute top-[20%] right-[12%] w-[11%] h-[11%] bg-accent rounded-full">
                <div className="absolute top-[15%] left-[15%] w-[45%] h-[45%] bg-background rounded-full wiggle" style={{animationDelay: '1s'}}></div>
              </div>
              
              {/* Multiple tentacles waving - responsive positioning */}
              <div className="absolute -top-[6%] left-[35%] w-[4%] h-[20%] bg-primary rounded-full wiggle"></div>
              <div className="absolute -top-[4%] right-[35%] w-[4%] h-[15%] bg-primary rounded-full wiggle" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute -left-[6%] top-[40%] w-[20%] h-[4%] bg-primary rounded-full wiggle" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute -right-[6%] top-[35%] w-[15%] h-[4%] bg-primary rounded-full wiggle" style={{animationDelay: '0.9s'}}></div>
              <div className="absolute -bottom-[6%] left-[40%] w-[4%] h-[20%] bg-primary rounded-full wiggle" style={{animationDelay: '1.2s'}}></div>

              {/* Happy expression - responsive sizing */}
              <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-[20%] h-[10%] bg-background rounded-full"></div>
              
              {/* Sparkles - responsive distribution */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[1%] h-[1%] bg-accent pulse-glow"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status text - mobile optimized */}
          <div className="mt-4 text-center px-4">
            <p className="font-pixel text-sm text-muted-foreground">
              Your belly buddy is wiggling happily!
            </p>
            <p className="font-pixel text-sm text-muted-foreground">
              Ready for some healthy food?
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button 
          onClick={onFeedPet}
          disabled={weirdnessLevel >= 100}
          className={`w-full max-w-md mx-auto block pixel-button text-xl py-6 transition-all ${
            weirdnessLevel >= 100 
              ? 'animate-pulse bg-gradient-to-r from-accent to-primary border-accent shadow-lg shadow-accent/50 opacity-50' 
              : 'hover:scale-105 transform'
          }`}
        >
          {weirdnessLevel >= 100 ? '💩 POOP TIME! GET READY! 💩' : 'FEED ME GOOD STUFF! 😋'}
        </Button>
      </div>
    </div>
  );
};

export default GameScreen;