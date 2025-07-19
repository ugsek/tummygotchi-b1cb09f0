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
    <div className="min-h-screen bg-background flex flex-col p-4">
      {/* Title */}
      <h1 className="text-2xl font-pixel text-foreground mb-6 text-center pixel-text-glow">
        FOOD TIP!
      </h1>

      {/* Smaller Pet character with speech bubble */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
          {/* Eyes */}
          <div className="absolute top-3 left-4 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-3 right-4 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-background rounded-full"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-3 w-4 h-2 bg-background rounded-full"></div>
          
          {/* Sparkles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 text-accent font-pixel text-xs animate-pulse"
              style={{
                left: `${-10 + Math.random() * 120}%`,
                top: `${-10 + Math.random() * 120}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              +
            </div>
          ))}
        </div>

        {/* Speech bubble */}
        <div className="absolute -top-2 left-24 border-2 border-accent bg-accent/10 p-3 max-w-xs rounded-lg">
          <p className="text-xs font-pixel text-foreground">
            {userGoal === 'healthy' ? 'WANT LEGENDARY POOPS? HERE\'S THE SECRET!' :
             userGoal === 'weight_loss' ? 'LOSE WEIGHT + UNLOCK EPIC POOPS!' :
             userGoal === 'muscle_gain' ? 'BUILD MUSCLES + CREATE RARE POOPS!' :
             'BALANCED EATING = MAGICAL POOPS!'}
          </p>
        </div>
      </div>

      {/* Pet name */}
      <h2 className="text-lg font-pixel text-foreground mb-6 text-center">
        {petName.toUpperCase()}
      </h2>

      {/* Healthy Eating Habit Tips - Based on User Goal */}
      <div className="space-y-4 w-full max-w-md mx-auto mb-6 flex-1">
        {loading ? (
          <div className="border-2 border-accent bg-accent/10 p-4 text-center rounded-lg">
            <p className="text-sm font-pixel text-foreground">
              ANALYZING YOUR BELLY NEEDS... 🧠
            </p>
          </div>
        ) : (
          <>
            {/* Goal-based tips */}
            {userGoal === 'healthy' && (
              <>
                <div className="border-2 border-green-400 bg-green-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🌈</span>
                    <h3 className="text-lg font-pixel text-foreground">EAT THE RAINBOW!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Different colored foods = different poop powers! Try one new color each day!
                  </p>
                </div>
                <div className="border-2 border-blue-400 bg-blue-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💧</span>
                    <h3 className="text-lg font-pixel text-foreground">HYDRATION STATION!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Water makes your belly buddy SUPER happy! Aim for clear pee = perfect poops!
                  </p>
                </div>
              </>
            )}

            {userGoal === 'weight_loss' && (
              <>
                <div className="border-2 border-green-400 bg-green-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🥦</span>
                    <h3 className="text-lg font-pixel text-foreground">VEGGIE POWER!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Fill half your plate with veggies! They're low calories but high poop magic!
                  </p>
                </div>
                <div className="border-2 border-purple-400 bg-purple-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🍗</span>
                    <h3 className="text-lg font-pixel text-foreground">PROTEIN POWER!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Protein keeps you full longer AND creates amazing poops! Win-win!
                  </p>
                </div>
              </>
            )}

            {userGoal === 'muscle_gain' && (
              <>
                <div className="border-2 border-red-400 bg-red-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💪</span>
                    <h3 className="text-lg font-pixel text-foreground">MUSCLE FUEL!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Eat protein every meal! Your muscles AND your poops will thank you!
                  </p>
                </div>
                <div className="border-2 border-orange-400 bg-orange-400/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🍝</span>
                    <h3 className="text-lg font-pixel text-foreground">CARB LOADING!</h3>
                  </div>
                  <p className="text-sm font-pixel text-muted-foreground">
                    Good carbs = workout energy = legendary poop combinations!
                  </p>
                </div>
              </>
            )}

            {/* Universal healthy tips */}
            <div className="border-2 border-yellow-400 bg-yellow-400/10 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-pixel text-foreground">BALANCE IS KEY!</h3>
              </div>
              <p className="text-sm font-pixel text-muted-foreground">
                Mix healthy foods with treats! Variety creates the weirdest, coolest poops!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom message - More encouraging */}
      <div className="border-2 border-accent bg-card p-4 mb-6 w-full max-w-md mx-auto rounded-lg">
        <p className="text-sm font-pixel text-foreground text-center mb-2">
          Keep munching and watch your Tummygotchi evolve to legendary poop types!
        </p>
        <p className="text-xs font-pixel text-muted-foreground text-center">
          The weirder the food combo, the cooler the poop! 💩✨
        </p>
      </div>

      {/* Sticky Back button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button
          onClick={onBackToGame}
          className="w-full max-w-md mx-auto block h-12 text-lg font-pixel pixel-button"
        >
          BACK TO GAME
        </Button>
      </div>
    </div>
  );
};

export default FoodTipScreen;