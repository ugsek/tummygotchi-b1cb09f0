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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 crt-scanlines pixel-grid-8">
      {/* Title Window */}
      <div className="pixel-window bg-card p-8 mb-8 w-full max-w-lg">
        <h1 className="text-xl font-pixel text-foreground text-center mb-4 pixel-text-outline">
          EMOJI TAP
        </h1>
        <p className="text-sm font-pixel text-muted-foreground text-center mb-6 pixel-text-outline">
          TAP 1-3 FOODS YOU ATE
        </p>

        {/* Food grid with 8-bit styling */}
        <div className="grid grid-cols-4 gap-2 mb-6 p-2" style={{ gap: '8px' }}>
          {foodEmojis.map((food, index) => (
            <button
              key={index}
              onClick={() => toggleFood(food.name)}
              className={`
                pixel-emoji-button flex items-center justify-center
                ${selectedFoods.includes(food.name) ? 'selected' : ''}
              `}
            >
              {food.emoji}
            </button>
          ))}
        </div>

        {/* Custom input with 8-bit styling */}
        <div className="mb-6">
          <p className="text-sm font-pixel text-muted-foreground mb-2 pixel-text-outline">
            OR TYPE WHAT YOU ATE
          </p>
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. pizza, broccoli, cookie"
            className="w-full p-2 pixel-input bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* 8-bit pet mascot */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary pixel-creature pixel-float flex items-center justify-center" style={{ 
            border: '2px solid hsl(var(--creature-accent))',
            boxShadow: 'inset -2px -2px 0px hsl(var(--creature-secondary)), inset 2px 2px 0px hsl(var(--creature-accent))'
          }}>
            <div className="text-xs font-pixel text-primary-foreground">🤗</div>
          </div>
        </div>

        {/* 8-bit confirm button */}
        <button
          onClick={handleConfirm}
          disabled={selectedFoods.length === 0 && !customInput.trim()}
          className="w-full h-12 text-lg pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default EmojiTapScreen;