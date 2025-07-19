import { Button } from "@/components/ui/button";
import { getPoopById } from "@/data/poopDatabase";

interface NewPoopUnlockedScreenProps {
  poopType: string;
  foods: string[];
  onAddToPoopdex: () => void;
  onGetFoodTip: () => void;
}

const NewPoopUnlockedScreen = ({ poopType, foods, onAddToPoopdex, onGetFoodTip }: NewPoopUnlockedScreenProps) => {
  const poop = getPoopById(poopType);
  
  if (!poop) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <h1 className="text-xl font-pixel text-foreground mb-8 text-center">
          POOP NOT FOUND!
        </h1>
        <Button onClick={onAddToPoopdex} className="pixel-button">
          CONTINUE
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-xl font-pixel text-foreground mb-2 text-center pixel-text-glow">
        NEW POOP UNLOCKED!
      </h1>
      <h2 className="text-2xl font-pixel text-foreground mb-2 text-center pixel-text-glow">
        {poop.name}
      </h2>
      
      {/* Rarity indicator */}
      <div className="mb-4 px-4 py-1 border-2 border-accent bg-accent/20 rounded">
        <span className="font-pixel text-sm text-accent uppercase">
          {poop.rarity}
        </span>
      </div>

      {/* Poop character with celebration effects */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
          {/* Poop emoji */}
          <div className="text-6xl">
            {poop.emoji}
          </div>
          
          {/* Celebration sparkles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${-40 + Math.random() * 180}%`,
                top: `${-40 + Math.random() * 180}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <span className="text-accent font-pixel text-lg">—</span>
            </div>
          ))}
        </div>
        
        {/* Celebration effects around character */}
        <div className="absolute -top-4 -left-4 text-accent font-pixel text-2xl animate-pulse">✨</div>
        <div className="absolute -top-4 -right-4 text-accent font-pixel text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute -bottom-4 -left-4 text-accent font-pixel text-2xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute -bottom-4 -right-4 text-accent font-pixel text-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>

      {/* Weirdness rating */}
      <div className="mb-6 text-center">
        <p className="text-lg font-pixel text-foreground mb-2">
          WEIRDNESS RATING
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-2xl ${i < poop.weirdness ? 'text-accent' : 'text-muted'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Food triggers */}
      <div className="border-2 border-accent bg-accent/10 p-4 mb-6 w-full max-w-md">
        <p className="text-sm font-pixel text-foreground text-center mb-2">
          UNLOCKED BY: {foods.join(' + ').toUpperCase()}
        </p>
        <p className="text-xs font-pixel text-muted-foreground text-center">
          {poop.description}
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-4 w-full max-w-md mb-6">
        <Button
          onClick={onAddToPoopdex}
          className="w-full h-16 text-lg font-pixel pixel-button"
        >
          ADD TO POOPDEX
        </Button>
        
        <Button
          onClick={onGetFoodTip}
          className="w-full h-16 text-lg font-pixel pixel-button"
        >
          GET A FOOD TIP
        </Button>
      </div>
    </div>
  );
};

export default NewPoopUnlockedScreen;