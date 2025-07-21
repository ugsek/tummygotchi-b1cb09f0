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
            w-48 h-48 flex items-center justify-center pixel-creature cursor-pointer relative
            transition-transform duration-200
            ${isSqueezing ? 'scale-95' : 'scale-100'}
            ${squeezeProgress > 50 ? 'animate-wiggle' : ''}
          `}
          onClick={handleSqueeze}
        >
          <img 
            src="/lovable-uploads/4feabc96-2bba-418b-9aaf-178a84075a9e.png" 
            alt="Squeeze Pet"
            className="w-full h-full object-contain"
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.3))'
            }}
          />
          
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
          <img 
            src="/lovable-uploads/37788816-4d27-4946-b5e7-faeb286c9f4e.png" 
            alt="Poop"
            className="w-16 h-16 object-contain mb-2"
            style={{
              imageRendering: 'pixelated'
            }}
          />
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