import { useEffect } from "react";

interface PlopScreenProps {
  petName: string;
  poopEmoji: string;
  onPlopComplete: () => void;
}

const PlopScreen = ({ petName, poopEmoji, onPlopComplete }: PlopScreenProps) => {
  useEffect(() => {
    // Auto advance after animation
    const timer = setTimeout(() => {
      onPlopComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onPlopComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse"></div>
      
      {/* Radiating burst lines */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 bg-accent/40 animate-pulse"
          style={{
            height: '40%',
            top: '30%',
            left: '50%',
            transformOrigin: 'bottom',
            transform: `translateX(-50%) rotate(${i * 22.5}deg)`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: '1.5s'
          }}
        ></div>
      ))}

      {/* Main PLOP title */}
      <div className="relative z-10 text-center mb-8 animate-scale-in">
        <h1 className="text-6xl sm:text-8xl font-pixel text-accent mb-4 pixel-text-glow animate-bounce">
          PLOP!
        </h1>
      </div>

      {/* Pet character - post-poop relief */}
      <div className="relative z-10 mb-8">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center pixel-creature animate-bounce relative">
          {/* Multiple relieved eyes */}
          <div className="absolute top-6 left-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-6 right-8 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-8 left-6 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          <div className="absolute top-8 right-6 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
          
          {/* Happy relieved mouth */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-accent rounded-full"></div>
          
          {/* Relief sparkles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
              style={{
                left: `${-40 + Math.random() * 180}%`,
                top: `${-40 + Math.random() * 180}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Large poop emoji with splash effect */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-8xl animate-bounce mb-4" style={{ animationDelay: '0.5s' }}>
          {poopEmoji}
        </div>
        
        {/* Splash effects around poop */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${-20 + (i % 4) * 15}%`,
              top: `${-10 + Math.floor(i / 4) * 20}%`,
              animationDelay: `${1 + i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          >
            <span className="text-accent font-pixel text-xl">+</span>
          </div>
        ))}
      </div>

      {/* Celebration confetti */}
      {[...Array(25)].map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute animate-bounce opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${1.5 + Math.random() * 1}s`,
            animationDuration: `${1 + Math.random() * 1}s`,
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

export default PlopScreen;