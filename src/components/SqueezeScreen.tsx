import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SqueezeScreenProps {
  petName: string;
  onPoopComplete: (poopType: string) => void;
}

const SqueezeScreen = ({ petName, onPoopComplete }: SqueezeScreenProps) => {
  const [squeezeProgress, setSqueezeProgress] = useState(0);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [showPoop, setShowPoop] = useState(false);

  const handleSqueeze = () => {
    if (isSqueezing) return;
    
    setIsSqueezing(true);
    const newProgress = Math.min(squeezeProgress + 20, 100);
    setSqueezeProgress(newProgress);
    
    if (newProgress >= 100) {
      setShowPoop(true);
      setTimeout(() => {
        onPoopComplete("crusty_wiggler");
      }, 2000);
    }
    
    setTimeout(() => setIsSqueezing(false), 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-2xl font-pixel text-foreground mb-4 text-center pixel-text-glow">
        {petName.toUpperCase()} LV.3
      </h1>
      <h2 className="text-lg font-pixel text-foreground mb-8 text-center">
        SQUEEZE FROM ANY SIDE!
      </h2>

      {/* Pet character - squeezable */}
      <div className="relative mb-8">
        <div 
          className={`
            w-48 h-48 bg-primary rounded-full flex items-center justify-center pixel-creature cursor-pointer
            transition-transform duration-200
            ${isSqueezing ? 'scale-95' : 'scale-100'}
            ${squeezeProgress > 50 ? 'animate-wiggle' : ''}
          `}
          onClick={handleSqueeze}
        >
          {/* Multiple eyes with varying expressions */}
          <div className="absolute top-8 left-12 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-8 right-12 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-12 left-8 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          <div className="absolute bottom-16 left-16 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          
          {/* Strained/concentrated expression */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            {squeezeProgress > 50 ? (
              <div className="w-8 h-6 bg-accent rounded flex items-center justify-center">
                <div className="text-background font-bold">😤</div>
              </div>
            ) : (
              <div className="w-8 h-4 bg-background rounded-full"></div>
            )}
          </div>
          
          {/* Sparkles increase with progress */}
          {[...Array(Math.floor(squeezeProgress / 10))].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 text-accent font-pixel text-xl animate-pulse"
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

        {/* Directional arrows */}
        <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-accent font-pixel text-2xl animate-pulse">
          →
        </div>
        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-accent font-pixel text-2xl animate-pulse">
          ←
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-accent font-pixel text-2xl animate-pulse">
          ↓
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-accent font-pixel text-2xl animate-pulse">
          ↑
        </div>

        {/* Squeeze effects */}
        {squeezeProgress > 25 && (
          <>
            <div className="absolute top-4 left-4 text-accent font-pixel animate-bounce">SQUISH!</div>
            <div className="absolute top-4 right-4 text-accent font-pixel animate-bounce" style={{ animationDelay: '0.5s' }}>GURGLE!</div>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <Progress value={squeezeProgress} className="h-6 bg-muted" />
        <p className="text-center text-sm font-pixel text-muted-foreground mt-2">
          SQUEEZE PROGRESS: {squeezeProgress}%
        </p>
      </div>

      {/* Poop animation */}
      {showPoop && (
        <div className="absolute bottom-20 flex flex-col items-center animate-bounce">
          <div className="text-6xl mb-2">💩</div>
          <div className="text-xl font-pixel text-accent animate-pulse">PLOP!</div>
        </div>
      )}

      {/* Instructions */}
      <p className="text-center text-lg font-pixel text-foreground pixel-text-glow">
        TUMMYGOTCHI
      </p>
    </div>
  );
};

export default SqueezeScreen;