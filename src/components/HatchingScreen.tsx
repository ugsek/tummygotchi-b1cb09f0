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
            <div className="w-32 h-32 mx-auto bg-primary rounded-full relative pixel-creature pulse-glow">
              {/* Multiple eyes */}
              <div className="absolute top-6 left-6 w-6 h-6 bg-accent rounded-full">
                <div className="absolute top-1 left-1 w-3 h-3 bg-background rounded-full"></div>
              </div>
              <div className="absolute top-4 right-8 w-4 h-4 bg-accent rounded-full">
                <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-background rounded-full"></div>
              </div>
              <div className="absolute top-8 right-4 w-5 h-5 bg-accent rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 bg-background rounded-full"></div>
              </div>
              
              {/* Multiple tentacles */}
              <div className="absolute -top-2 left-12 w-2 h-8 bg-primary rounded-full wiggle"></div>
              <div className="absolute -top-1 right-12 w-2 h-6 bg-primary rounded-full wiggle" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute -left-2 top-16 w-8 h-2 bg-primary rounded-full wiggle" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute -right-2 top-12 w-6 h-2 bg-primary rounded-full wiggle" style={{animationDelay: '0.9s'}}></div>

              {/* Mouth */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-background rounded-full"></div>
              
              {/* Sparkles everywhere */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent pulse-glow"
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