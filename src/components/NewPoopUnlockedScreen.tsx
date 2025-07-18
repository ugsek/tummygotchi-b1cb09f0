import { Button } from "@/components/ui/button";

interface NewPoopUnlockedScreenProps {
  poopType: string;
  onAddToPoopdex: () => void;
  onGetFoodTip: () => void;
}

const poopData = {
  crusty_wiggler: {
    name: "CRUSTY WIGGLER",
    weirdness: 5,
    triggers: "BROCCOLI + SUGAR + RICE",
    description: "Add a veggie next time to unlock a rare glitter dump!"
  }
};

const NewPoopUnlockedScreen = ({ poopType, onAddToPoopdex, onGetFoodTip }: NewPoopUnlockedScreenProps) => {
  const poop = poopData[poopType as keyof typeof poopData];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-xl font-pixel text-foreground mb-2 text-center pixel-text-glow">
        NEW POOP UNLOCKED!
      </h1>
      <h2 className="text-2xl font-pixel text-foreground mb-8 text-center pixel-text-glow">
        {poop.name}
      </h2>

      {/* Poop character with celebration effects */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
          {/* Eyes */}
          <div className="absolute top-6 left-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-6 right-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          
          {/* Happy mouth */}
          <div className="absolute bottom-8 w-8 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-6 h-2 bg-background rounded-full"></div>
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
      <div className="border-2 border-accent bg-accent/10 p-4 mb-8 w-full max-w-md">
        <p className="text-sm font-pixel text-foreground text-center mb-2">
          FOOD TRIGGERS: {poop.triggers}
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-4 w-full max-w-md">
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

      {/* Bottom hint text */}
      <p className="text-xs font-pixel text-muted-foreground text-center mt-6 max-w-md">
        {poop.description}
      </p>
    </div>
  );
};

export default NewPoopUnlockedScreen;