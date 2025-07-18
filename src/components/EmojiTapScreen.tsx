import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmojiTapScreenProps {
  onConfirm: (foods: string[]) => void;
}

const foodEmojis = [
  { emoji: "🍎", name: "apple" },
  { emoji: "🍗", name: "chicken" },
  { emoji: "🥦", name: "broccoli" },
  { emoji: "🍕", name: "pizza" },
  { emoji: "🍪", name: "cookie" },
  { emoji: "🥤", name: "smoothie" },
  { emoji: "🥤", name: "soda" },
  { emoji: "🍌", name: "banana" },
];

const EmojiTapScreen = ({ onConfirm }: EmojiTapScreenProps) => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const toggleFood = (foodName: string) => {
    setSelectedFoods(prev => 
      prev.includes(foodName) 
        ? prev.filter(f => f !== foodName)
        : [...prev, foodName]
    );
  };

  const handleConfirm = () => {
    const allFoods = [...selectedFoods];
    if (customInput.trim()) {
      allFoods.push(...customInput.split(',').map(f => f.trim()));
    }
    onConfirm(allFoods);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <div className="border-4 border-accent bg-card p-6 mb-8 w-full max-w-lg">
        <h1 className="text-xl font-pixel text-foreground text-center mb-4 pixel-text-glow">
          EMOJI TAP
        </h1>
        <p className="text-sm font-pixel text-muted-foreground text-center mb-6">
          TAP 1-3 FOODS YOU ATE
        </p>

        {/* Food grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {foodEmojis.map((food, index) => (
            <button
              key={index}
              onClick={() => toggleFood(food.name)}
              className={`
                w-16 h-16 border-2 flex items-center justify-center text-2xl
                transition-all duration-200 hover:scale-105
                ${selectedFoods.includes(food.name) 
                  ? 'border-accent bg-accent/20 shadow-lg' 
                  : 'border-muted bg-muted/10 hover:border-accent/50'
                }
              `}
            >
              {food.emoji}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="mb-6">
          <p className="text-sm font-pixel text-muted-foreground mb-2">
            OR TYPE WHAT YOU ATE
          </p>
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. pizza, broccoli, cookie"
            className="font-pixel text-sm bg-input border-2 border-muted focus:border-accent"
          />
        </div>

        {/* Pet mascot */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center pixel-creature">
            <div className="text-xs font-pixel text-primary-foreground">🤗</div>
          </div>
        </div>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          disabled={selectedFoods.length === 0 && !customInput.trim()}
          className="w-full h-12 text-lg font-pixel pixel-button"
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
};

export default EmojiTapScreen;