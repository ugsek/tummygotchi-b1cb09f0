import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { generateFoodReaction } from "@/lib/generateFoodReaction";

interface FoodReactionScreenProps {
  foods: string[];
  userGoal: string;
  currentWeirdness: number;
  onContinue: (weirdnessBoost: number) => void;
}

const FoodReactionScreen = ({ foods, userGoal, currentWeirdness, onContinue }: FoodReactionScreenProps) => {
  const [reaction, setReaction] = useState<string>("🤤");
  const [message, setMessage] = useState<string>("Analyzing taste...");
  const [bellyStatus, setBellyStatus] = useState<string>("Processing...");
  const [weirdnessBoost, setWeirdnessBoost] = useState<number>(2);
  const [loading, setLoading] = useState(true);
  const [newWeirdness, setNewWeirdness] = useState(currentWeirdness);

  // Check if food combo is healthy
  const healthyFoods = ['salad', 'broccoli', 'spinach', 'carrot', 'apple', 'banana', 'quinoa', 'tofu', 'fish', 'yogurt', 'nuts', 'berries', 'avocado'];
  const unhealthyFoods = ['pizza', 'burger', 'fries', 'soda', 'candy', 'donut', 'chocolate', 'chips', 'ice cream'];
  
  const isHealthy = foods.some(food => 
    healthyFoods.some(healthy => 
      food.toLowerCase().includes(healthy)
    )
  );

  const hasInappropriateContent = foods.some(food => {
    const inappropriateWords = ['shit', 'ass', 'poop', 'pee', 'human', 'body', 'death', 'kill', 'blood', 'gore', 'sex', 'drug', 'tobacco', 'alcohol', 'poison', 'toxic', 'chemical', 'soap', 'dirt', 'mud', 'plastic', 'metal', 'paper'];
    return inappropriateWords.some(word => 
      food.toLowerCase().includes(word.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        setLoading(true);
        
        // Handle inappropriate content locally first
        if (hasInappropriateContent) {
          setReaction("🤢");
          setMessage("THAT'S NOT FOOD! TRY REAL FOOD!");
          setBellyStatus("Belly is confused and sad!");
          setWeirdnessBoost(-1);
          setNewWeirdness(Math.max(0, currentWeirdness - 10));
          setLoading(false);
          return;
        }
        
        const response = await generateFoodReaction(foods, userGoal, isHealthy);
        setReaction(response.reaction || "🤤");
        setMessage(response.message || "BELLY LIKES THIS WEIRD COMBO!");
        setBellyStatus(response.bellyStatus || "Gurgling with excitement!");
        
        // Calculate weirdness boost for daily system
        let boost = response.weirdnessBoost || 2;
        
        if (isHealthy) {
          boost = Math.max(boost, 3); // Healthy food gets at least 3
        } else if (foods.some(food => unhealthyFoods.some(bad => food.toLowerCase().includes(bad)))) {
          boost = Math.min(boost, 1); // Unhealthy food gets max 1
        }
        
        setWeirdnessBoost(boost);
        setNewWeirdness(Math.min(100, currentWeirdness + (boost * 10))); // Daily boost system
      } catch (error) {
        console.error('Failed to generate reaction:', error);
        // Fallback
        setReaction("🤤");
        setMessage("BELLY LIKES THIS WEIRD COMBO!");
        setBellyStatus("Gurgling with excitement!");
        setWeirdnessBoost(2);
        setNewWeirdness(Math.min(100, currentWeirdness + 20));
      } finally {
        setLoading(false);
      }
    };

    fetchReaction();
  }, [foods, userGoal, isHealthy, currentWeirdness, hasInappropriateContent]);

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      {/* Food consumed - Mobile header */}
      <div className="mb-4 text-center">
        <h2 className="font-pixel text-lg text-accent mb-2">
          FOODS CONSUMED:
        </h2>
        <p className="font-pixel text-sm text-foreground">
          {foods.join(' + ').toUpperCase()}
        </p>
      </div>

      {/* HERO PET REACTION - Reduced to 70% size */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[45vh] max-h-[50vh]">
        <div className="w-full aspect-square max-w-[60vw] max-h-[42vh] relative pixel-creature wiggle">
          <div className="w-full h-full bg-primary rounded-full relative">
            {/* Big reaction emoji - responsive positioning */}
            <div className="absolute -top-[15%] -right-[15%] text-[20%] leading-none">
              {reaction}
            </div>
            
            {/* Eyes - responsive sizing */}
            <div className="absolute top-[20%] left-[20%] w-[10%] h-[10%] bg-accent rounded-full">
              <div className="absolute top-[15%] left-[15%] w-[50%] h-[50%] bg-background rounded-full"></div>
            </div>
            <div className="absolute top-[20%] right-[20%] w-[10%] h-[10%] bg-accent rounded-full">
              <div className="absolute top-[15%] left-[15%] w-[50%] h-[50%] bg-background rounded-full"></div>
            </div>
            
            {/* Mouth - responsive sizing */}
            <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-[15%] h-[8%] bg-background rounded-full"></div>
            
            {/* Sparkles - responsive distribution */}
            {[...Array(6)].map((_, i) => (
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

        {/* Reaction message - Below pet */}
        <div className="mt-4 text-center px-4">
          <h3 className="font-pixel text-lg text-primary mb-2 pixel-text-glow">
            {loading ? "BELLY ANALYZING..." : message}
          </h3>
          <p className="font-pixel text-sm text-muted-foreground">
            {loading ? "Processing flavors..." : bellyStatus}
          </p>
        </div>
      </div>

      {/* Weirdness boost indicator - Mobile optimized */}
      <div className="mb-6 w-full max-w-md mx-auto">
        <div className="font-pixel text-sm text-accent mb-2 text-center">
          {weirdnessBoost >= 0 ? `DAILY BOOST: +${weirdnessBoost}/3` : "PENALTY: -1 (NOT FOOD!)"}
        </div>
        <div className="flex justify-center text-xs font-pixel text-muted-foreground mb-2">
          <span>NOW</span>
        </div>
        <div className="relative">
          <Progress 
            value={newWeirdness} 
            className="h-6 bg-muted border-2 border-accent"
          />
        </div>
        <p className="font-pixel text-xs text-muted-foreground text-center mt-2">
          {weirdnessBoost < 0 ? "ONLY REAL FOOD COUNTS!" :
           isHealthy ? "HEALTHY FOOD = BIG BOOST!" : "JUNK FOOD = SMALL BOOST!"}
        </p>
      </div>

      {/* Sticky Continue button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button
          onClick={() => onContinue(weirdnessBoost)}
          disabled={loading}
          className="w-full max-w-md mx-auto block h-12 text-lg font-pixel pixel-button"
        >
          {loading ? "BELLY IS THINKING..." : "YUM! WHAT'S NEXT? 🤤"}
        </Button>
      </div>
    </div>
  );
};

export default FoodReactionScreen;