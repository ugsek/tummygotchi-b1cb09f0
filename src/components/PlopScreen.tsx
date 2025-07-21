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
        <div className="w-32 h-32 relative animate-bounce">
          <img 
            src="/lovable-uploads/d5bcdd78-dbeb-40d0-a5e2-f3237ae15ccf.png" 
            alt="Gut Pet"
            className="w-full h-full object-contain pixel-creature"
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.3))'
            }}
          />
          
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

      {/* Large poop with splash effect */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-bounce mb-4" style={{ animationDelay: '0.5s' }}>
          <img 
            src="/lovable-uploads/37788816-4d27-4946-b5e7-faeb286c9f4e.png" 
            alt="Poop"
            className="w-24 h-24 object-contain"
            style={{
              imageRendering: 'pixelated'
            }}
          />
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