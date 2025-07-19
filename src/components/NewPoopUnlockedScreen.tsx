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
          OH WELL! KEEP GOING!
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse"></div>
      
      {/* Radiating lines effect */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 bg-accent/30 animate-pulse"
          style={{
            height: '50%',
            top: '25%',
            left: '50%',
            transformOrigin: 'bottom',
            transform: `translateX(-50%) rotate(${i * 22.5}deg)`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '2s'
          }}
        ></div>
      ))}

      {/* Title with dramatic entrance */}
      <div className="relative z-10 text-center mb-4 animate-scale-in">
        <h1 className="text-4xl sm:text-5xl font-pixel text-accent mb-2 pixel-text-glow animate-fade-in">
          NEW POOP
        </h1>
        <h1 className="text-4xl sm:text-5xl font-pixel text-accent mb-4 pixel-text-glow animate-fade-in" style={{ animationDelay: '0.5s' }}>
          UNLOCKED!
        </h1>
      </div>
      
      {/* Poop name with rarity */}
      <div className="relative z-10 text-center mb-6 animate-fade-in" style={{ animationDelay: '1s' }}>
        <h2 className="text-2xl sm:text-3xl font-pixel text-foreground mb-2 pixel-text-glow">
          {poop.name.toUpperCase()}
        </h2>
        <div className="inline-block px-4 py-2 border-2 border-accent bg-accent/20 rounded-lg">
          <span className="font-pixel text-sm text-accent uppercase">
            {poop.rarity}
          </span>
        </div>
      </div>

      {/* Main poop character with dramatic presentation */}
      <div className="relative z-10 mb-8 animate-scale-in" style={{ animationDelay: '1.5s' }}>
        <div className="relative">
          {/* Glow effect behind poop */}
          <div className="absolute inset-0 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
          
          {/* Main poop container */}
          <div className="relative w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-4 border-accent shadow-2xl">
            {/* Poop emoji */}
            <div className="text-8xl animate-bounce" style={{ animationDuration: '2s' }}>
              {poop.emoji}
            </div>
          </div>
          
          {/* Celebration sparkles in better positions */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${20 + (i % 4) * 30}%`,
                top: `${20 + Math.floor(i / 4) * 60}%`,
                animationDelay: `${1.5 + i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            >
              <span className="text-accent font-pixel text-xl">✨</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weirdness rating with entrance animation */}
      <div className="relative z-10 mb-6 text-center animate-fade-in" style={{ animationDelay: '2s' }}>
        <p className="text-lg sm:text-xl font-pixel text-foreground mb-3 pixel-text-glow">
          WEIRDNESS RATING
        </p>
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-3xl transition-all duration-300 ${i < poop.weirdness ? 'text-accent animate-bounce' : 'text-muted'}`}
              style={{ 
                animationDelay: `${2.5 + i * 0.2}s`,
                animationDuration: '0.6s',
                animationIterationCount: '2'
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Food triggers */}
      <div className="relative z-10 border-2 border-accent bg-accent/10 p-4 mb-6 w-full max-w-md rounded-lg animate-fade-in" style={{ animationDelay: '2.5s' }}>
        <p className="text-sm font-pixel text-foreground text-center mb-2">
          FOOD TRIGGERS: {foods.join(' + ').toUpperCase()}
        </p>
        <p className="text-xs font-pixel text-muted-foreground text-center">
          {poop.description}
        </p>
      </div>

      {/* Action buttons with staggered entrance */}
      <div className="relative z-10 space-y-4 w-full max-w-md animate-fade-in" style={{ animationDelay: '3s' }}>
        <Button
          onClick={onAddToPoopdex}
          className="w-full h-16 text-lg font-pixel pixel-button bg-primary hover:bg-primary/80 border-2 border-accent"
        >
          COLLECT THIS WEIRD POOP! 💩
        </Button>
        
        <Button
          onClick={onGetFoodTip}
          className="w-full h-16 text-lg font-pixel pixel-button bg-accent hover:bg-accent/80 border-2 border-primary"
        >
          TELL ME FOOD SECRETS! 🤫
        </Button>
      </div>
      
      {/* Extra celebration confetti */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute animate-bounce opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${3 + Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <span className="text-accent font-pixel text-sm">
            {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NewPoopUnlockedScreen;