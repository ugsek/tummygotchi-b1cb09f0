import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmojiTapScreenProps {
  onConfirm: (foods: string[]) => void;
}

const foodCategories = [
  {
    name: "FRUITS",
    color: "text-green-400",
    foods: [
      { emoji: "🍎", name: "apple" },
      { emoji: "🍌", name: "banana" },
      { emoji: "🍊", name: "orange" },
      { emoji: "🍓", name: "strawberries" },
      { emoji: "🫐", name: "blueberries" },
      { emoji: "🍇", name: "grapes" },
    ]
  },
  {
    name: "VEGETABLES",
    color: "text-emerald-400", 
    foods: [
      { emoji: "🥦", name: "broccoli" },
      { emoji: "🥕", name: "carrot" },
      { emoji: "🥬", name: "spinach" },
      { emoji: "🍅", name: "tomato" },
      { emoji: "🌶️", name: "peppers" },
      { emoji: "🥒", name: "cucumber" },
    ]
  },
  {
    name: "PROTEINS", 
    color: "text-red-400",
    foods: [
      { emoji: "🍗", name: "chicken" },
      { emoji: "🥩", name: "beef" },
      { emoji: "🐟", name: "fish" },
      { emoji: "🥚", name: "eggs" },
      { emoji: "🫘", name: "beans" },
      { emoji: "🧀", name: "cheese" },
    ]
  },
  {
    name: "GRAINS & CARBS",
    color: "text-amber-400",
    foods: [
      { emoji: "🍞", name: "bread" },
      { emoji: "🍝", name: "pasta" },
      { emoji: "🍚", name: "rice" },
      { emoji: "🥖", name: "quinoa" },
      { emoji: "🥣", name: "oatmeal" },
      { emoji: "🥯", name: "bagel" },
    ]
  },
  {
    name: "DAIRY",
    color: "text-blue-400", 
    foods: [
      { emoji: "🥛", name: "milk" },
      { emoji: "🧈", name: "yogurt" },
      { emoji: "🧀", name: "cheese" },
      { emoji: "🍦", name: "ice_cream" },
    ]
  },
  {
    name: "SNACKS & TREATS",
    color: "text-purple-400",
    foods: [
      { emoji: "🍪", name: "cookies" },
      { emoji: "🍫", name: "chocolate" },
      { emoji: "🍰", name: "cake" },
      { emoji: "🍩", name: "donut" },
      { emoji: "🍿", name: "popcorn" },
      { emoji: "🥜", name: "nuts" },
    ]
  },
  {
    name: "FAST FOOD",
    color: "text-orange-400",
    foods: [
      { emoji: "🍕", name: "pizza" },
      { emoji: "🍔", name: "burger" },
      { emoji: "🍟", name: "fries" },
      { emoji: "🌮", name: "tacos" },
      { emoji: "🌭", name: "hot_dog" },
      { emoji: "🥪", name: "sandwich" },
    ]
  },
  {
    name: "BEVERAGES",
    color: "text-cyan-400",
    foods: [
      { emoji: "💧", name: "water" },
      { emoji: "🥤", name: "soda" },
      { emoji: "🧃", name: "juice" },
      { emoji: "☕", name: "coffee" },
      { emoji: "🫖", name: "tea" },
      { emoji: "🥤", name: "smoothie" },
    ]
  }
];

const EmojiTapScreen = ({ onConfirm }: EmojiTapScreenProps) => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);

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
    <div className="min-h-screen bg-background flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-pixel text-foreground mb-2 pixel-text-glow">
          EMOJI TAP
        </h1>
        <p className="text-sm font-pixel text-muted-foreground mb-4">
          TAP 1-3 FOODS YOU ATE TODAY
        </p>
        
        {/* Selected foods display */}
        <div className="flex justify-center gap-2 mb-4 min-h-[3rem] items-center flex-wrap">
          {selectedFoods.length > 0 ? (
            selectedFoods.map((food, index) => (
              <div key={index} className="px-3 py-1 bg-accent/20 border border-accent rounded font-pixel text-sm text-accent">
                {food.toUpperCase()}
              </div>
            ))
          ) : (
            <p className="text-xs font-pixel text-muted-foreground">
              Select foods from categories below
            </p>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
        {foodCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`
              px-4 py-2 font-pixel text-xs whitespace-nowrap border-2 transition-all
              ${activeCategory === index 
                ? 'border-accent bg-accent/20 text-accent' 
                : 'border-muted bg-muted/10 text-muted-foreground hover:border-accent/50'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Active category foods */}
      <div className="flex-1 mb-6">
        <div className={`text-center mb-4 font-pixel text-sm ${foodCategories[activeCategory].color}`}>
          {foodCategories[activeCategory].name}
        </div>
        
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {foodCategories[activeCategory].foods.map((food, index) => (
            <button
              key={index}
              onClick={() => toggleFood(food.name)}
              className={`
                aspect-square border-2 flex flex-col items-center justify-center p-3 transition-all
                ${selectedFoods.includes(food.name) 
                  ? 'border-accent bg-accent/20 scale-105 shadow-lg' 
                  : 'border-muted bg-muted/10 hover:border-accent/50 hover:scale-102'
                }
              `}
            >
              <div className="text-3xl mb-1">{food.emoji}</div>
              <div className="text-xs font-pixel text-center leading-tight">
                {food.name.replace('_', ' ').toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="mb-6 max-w-md mx-auto w-full">
        <p className="text-sm font-pixel text-muted-foreground mb-2 text-center">
          OR TYPE CUSTOM FOODS
        </p>
        <Input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="e.g. kimchi, avocado toast, energy drink"
          className="font-pixel text-center bg-background border-2 border-muted focus:border-accent"
        />
      </div>

      {/* Confirm button */}
      <div className="max-w-md mx-auto w-full">
        <Button
          onClick={handleConfirm}
          disabled={selectedFoods.length === 0 && !customInput.trim()}
          className="w-full h-14 text-lg font-pixel pixel-button hover:scale-105 transform transition-all"
        >
          CONFIRM FOODS ({selectedFoods.length + (customInput.trim() ? customInput.split(',').length : 0)})
        </Button>
      </div>
    </div>
  );
};

export default EmojiTapScreen;