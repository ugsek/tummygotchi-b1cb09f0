import { useEffect, useState } from "react";

interface HatchingScreenProps {
  blobName: string;
  onHatchingComplete: () => void;
}

const HatchingScreen = ({ blobName, onHatchingComplete }: HatchingScreenProps) => {
  const [stage, setStage] = useState<'squirming' | 'cracking' | 'hatching'>('squirming');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('cracking'), 2000);
    const timer2 = setTimeout(() => setStage('hatching'), 4000);
    const timer3 = setTimeout(() => onHatchingComplete(), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onHatchingComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {stage === 'squirming' && (
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="w-full h-full bg-primary rounded-full relative pixel-creature blob-bounce">
              {/* Sparkles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent pulse-glow"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
          <h2 className="font-pixel text-2xl text-accent">
            SQUIRMING
          </h2>
        </div>
      )}

      {stage === 'cracking' && (
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="w-full h-full bg-primary rounded-full relative pixel-creature wiggle">
              {/* Crack lines */}
              <div className="absolute top-8 left-12 w-16 h-1 bg-background transform rotate-45"></div>
              <div className="absolute top-16 right-8 w-12 h-1 bg-background transform -rotate-12"></div>
              <div className="absolute bottom-12 left-8 w-20 h-1 bg-background transform rotate-12"></div>
              
              {/* Sparkles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent pulse-glow"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
          </div>
          <h2 className="font-pixel text-2xl text-accent">
            YOUR POD IS
          </h2>
          <h2 className="font-pixel text-2xl text-accent">
            HATCHING!
          </h2>
        </div>
      )}

      {stage === 'hatching' && (
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            {/* Broken shell pieces */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-lg transform rotate-45 opacity-50"></div>
            <div className="absolute top-8 right-4 w-10 h-10 bg-primary rounded-lg transform -rotate-12 opacity-50"></div>
            <div className="absolute bottom-4 left-8 w-14 h-8 bg-primary rounded-lg transform rotate-12 opacity-50"></div>
            
            {/* New creature emerging */}
            <div className="w-32 h-32 mx-auto relative">
              <img 
                src="/lovable-uploads/d5bcdd78-dbeb-40d0-a5e2-f3237ae15ccf.png" 
                alt="Gut Pet"
                className="w-full h-full object-contain pixel-creature pulse-glow"
                style={{
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.3))'
                }}
              />
              
              {/* Floating sparkles around the pet */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent pulse-glow rounded-full"
                  style={{
                    left: `${Math.random() * 120 - 10}%`,
                    top: `${Math.random() * 120 - 10}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
          <h2 className="font-pixel text-2xl text-accent mb-4">
            YOUR POD IS
          </h2>
          <h2 className="font-pixel text-2xl text-accent">
            HATCHING!
          </h2>
          <div className="mt-4">
            <div className="w-8 h-8 mx-auto bg-accent rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HatchingScreen;