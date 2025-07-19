import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateFoodTip } from "@/lib/generateFoodTip";

interface FoodTip {
  emoji: string;
  title: string;
  description: string;
}

interface FoodTipScreenProps {
  petName: string;
  foods: string[];
  userGoal: string;
  poopType?: string;
  onBackToGame: () => void;
}

const FoodTipScreen = ({ petName, foods, userGoal, poopType = "unknown", onBackToGame }: FoodTipScreenProps) => {
  const [tips, setTips] = useState<FoodTip[]>([]);
  const [encouragement, setEncouragement] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const response = await generateFoodTip(foods, userGoal, poopType);
        setTips(response.tips || []);
        setEncouragement(response.encouragement || "THESE FOODS WILL HELP YOU UNLOCK RARE POOP TYPES!");
      } catch (error) {
        console.error('Failed to generate tips:', error);
        // Fallback tips
        setTips([
          { emoji: "🥦", title: "ADD MORE FIBER!", description: "Try broccoli, beans, or whole grains" },
          { emoji: "🍇", title: "LESS SUGAR!", description: "Try fruit instead of candy" },
          { emoji: "🥚", title: "MORE PROTEIN!", description: "Add eggs, tofu, or lean meat" }
        ]);
        setEncouragement("THESE FOODS WILL HELP YOU UNLOCK RARE POOP TYPES!");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [foods, userGoal, poopType]);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-2xl font-pixel text-foreground mb-8 text-center pixel-text-glow">
        FOOD TIP!
      </h1>

      {/* Pet character with speech bubble */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow">
          {/* Eyes */}
          <div className="absolute top-4 left-5 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-4 right-5 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-background rounded-full"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-4 w-4 h-2 bg-background rounded-full"></div>
          
          {/* Sparkles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 text-accent font-pixel text-sm animate-pulse"
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

        {/* Speech bubble */}
        <div className="absolute -top-4 left-32 border-4 border-accent bg-accent/10 p-4 max-w-xs">
          <p className="text-sm font-pixel text-foreground">
            BASED ON YOUR POOP, HERE'S WHAT YOUR BODY NEEDS:
          </p>
        </div>
      </div>

      {/* Pet name */}
      <h2 className="text-lg font-pixel text-foreground mb-8 text-center">
        {petName.toUpperCase()}
      </h2>

      {/* Food tips */}
      <div className="space-y-4 w-full max-w-md mb-8">
        {loading ? (
          <div className="border-2 border-accent bg-accent/10 p-4 text-center">
            <p className="text-sm font-pixel text-foreground">
              ANALYZING YOUR MEAL... 🧠
            </p>
          </div>
        ) : (
          tips.map((tip, index) => (
            <div key={index} className="border-2 border-accent bg-accent/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tip.emoji}</span>
                <h3 className="text-lg font-pixel text-foreground">{tip.title}</h3>
              </div>
              <p className="text-sm font-pixel text-muted-foreground">
                {tip.description}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Bottom message */}
      <div className="border-2 border-accent bg-card p-4 mb-8 w-full max-w-md">
        <p className="text-sm font-pixel text-foreground text-center">
          {encouragement}
        </p>
      </div>

      {/* Back button */}
      <Button
        onClick={onBackToGame}
        className="w-full max-w-md h-12 text-lg font-pixel pixel-button"
      >
        BACK TO GAME
      </Button>
    </div>
  );
};

export default FoodTipScreen;