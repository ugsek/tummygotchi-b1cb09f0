import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { 
  getLevelTitle, 
  getExperienceToNextLevel, 
  getExperienceForLevel 
} from "@/lib/levelingSystem";
import { 
  generateFoodBasedMessage, 
  generateChatNudgeMessage, 
  shouldShowChatNudge 
} from "@/lib/petMessages";

interface GameScreenProps {
  petName: string;
  weirdnessLevel: number;
  daysLogged: number;
  level: number;
  experiencePoints: number;
  lastEatenFoods: string[];
  totalMealsEaten: number;
  onFeedPet: () => void;
}

const GameScreen = ({ 
  petName, 
  weirdnessLevel, 
  daysLogged, 
  level, 
  experiencePoints, 
  lastEatenFoods, 
  totalMealsEaten, 
  onFeedPet 
}: GameScreenProps) => {
  const [streak, setStreak] = useState(3);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [showChatNudge, setShowChatNudge] = useState<boolean>(false);

  // Calculate level progress
  const currentLevelExp = getExperienceForLevel(level);
  const nextLevelExp = level >= 100 ? currentLevelExp : getExperienceForLevel(level + 1);
  const expToNext = getExperienceToNextLevel(experiencePoints, level);
  const levelProgress = level >= 100 ? 100 : ((experiencePoints - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  // Generate funny messages based on last eaten food or chat nudges
  useEffect(() => {
    const shouldNudge = shouldShowChatNudge(totalMealsEaten);
    setShowChatNudge(shouldNudge);
    
    if (shouldNudge) {
      setCurrentMessage(generateChatNudgeMessage(petName));
    } else {
      setCurrentMessage(generateFoodBasedMessage(lastEatenFoods, petName));
    }
  }, [lastEatenFoods, totalMealsEaten, petName]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header with Level and Weirdness */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-accent/20 p-4 z-10">
        {/* Level Display */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-lg text-accent">LVL {level}</span>
              <span className="font-pixel text-xs text-muted-foreground">
                {getLevelTitle(level)}
              </span>
            </div>
            {level < 100 && (
              <span className="font-pixel text-xs text-muted-foreground">
                {expToNext} XP to next
              </span>
            )}
          </div>
          {level < 100 && (
            <Progress 
              value={levelProgress} 
              className="h-2 bg-muted/50 border border-accent/30"
            />
          )}
          {level >= 100 && (
            <div className="text-center">
              <span className="font-pixel text-xs text-accent animate-pulse">
                ⭐ MAX LEVEL ACHIEVED! ⭐
              </span>
            </div>
          )}
        </div>
        
        {/* Weirdness Meter */}
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

          {/* Dynamic Pet Messages */}
          <div className="mt-4 text-center px-4">
            <div className={`
              border-2 border-accent bg-accent/10 p-4 rounded-lg relative
              ${showChatNudge ? 'animate-pulse border-primary bg-primary/10' : ''}
            `}>
              <p className="font-pixel text-sm text-foreground leading-relaxed">
                {currentMessage}
              </p>
              {showChatNudge && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-primary rounded-full animate-bounce flex items-center justify-center">
                    <span className="text-xs">💬</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Stats Display */}
            <div className="flex justify-center gap-4 mt-3 text-xs font-pixel text-muted-foreground">
              <span>Meals: {totalMealsEaten}</span>
              <span>XP: {experiencePoints}</span>
              <span>Days: {daysLogged}</span>
            </div>
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