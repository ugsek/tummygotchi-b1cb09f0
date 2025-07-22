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
import { 
  getCurrentMealPeriod, 
  getMealTimingComment 
} from "@/lib/timeSensitiveMessages";

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
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mealPeriod, setMealPeriod] = useState<string>("");

  // Calculate level progress
  const currentLevelExp = getExperienceForLevel(level);
  const nextLevelExp = level >= 100 ? currentLevelExp : getExperienceForLevel(level + 1);
  const expToNext = getExperienceToNextLevel(experiencePoints, level);
  const levelProgress = level >= 100 ? 100 : ((experiencePoints - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  // Generate funny messages based on last eaten food or chat nudges
  useEffect(() => {
    const updateTimeAndMessages = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
      setMealPeriod(getCurrentMealPeriod());
      
      const shouldNudge = shouldShowChatNudge(totalMealsEaten);
      setShowChatNudge(shouldNudge);
      
      if (shouldNudge) {
        setCurrentMessage(generateChatNudgeMessage(petName));
      } else {
        setCurrentMessage(generateFoodBasedMessage(lastEatenFoods, petName, totalMealsEaten, daysLogged));
      }
    };

    // Update immediately
    updateTimeAndMessages();
    
    // Update every minute to keep time current
    const interval = setInterval(updateTimeAndMessages, 60000);
    
    return () => clearInterval(interval);
  }, [lastEatenFoods, totalMealsEaten, petName]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header with Level and Weirdness */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-accent/20 p-4 z-10">
        {/* Time Display Only */}
        <div className="mb-3">
          <div className="text-center">
            <div className="font-pixel text-lg text-accent">{currentTime}</div>
            <div className="font-pixel text-sm text-muted-foreground capitalize">
              {mealPeriod.replace('_', ' ')} time
            </div>
          </div>
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
        {/* Dynamic Pet Messages - Above Pet */}
        <div className="mb-4 text-center px-4">
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
        </div>

        {/* HERO PET DISPLAY - Centered */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full aspect-square max-w-[60vw] max-h-[42vh] relative">
            {/* Pet image - animated gut creature */}
            <div className="w-full h-full relative blob-bounce">
            <img 
              src="/lovable-uploads/d5bcdd78-dbeb-40d0-a5e2-f3237ae15ccf.png" 
              alt="Gut Pet"
              className="w-full h-full object-contain pixel-creature wiggle"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.3))'
              }}
            />
              
              {/* Floating sparkles around the pet */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2%] h-[2%] bg-accent pulse-glow rounded-full"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Stats Display - Simplified */}
          <div className="flex justify-center gap-4 mt-3 text-xs font-pixel text-muted-foreground">
            <span>Meals: {totalMealsEaten}</span>
            <span>Days: {daysLogged}</span>
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
          {weirdnessLevel >= 100 ? '💩 POOP TIME! 💩' : 'FEED! 🍽️'}
        </Button>
      </div>
    </div>
  );
};

export default GameScreen;