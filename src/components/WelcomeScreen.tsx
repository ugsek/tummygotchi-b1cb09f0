import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      {/* Floating pixels/sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main title */}
      <div className="mb-8 relative z-10">
        <img 
          src="/lovable-uploads/28bc6de2-09c5-46a3-86c3-1703e86cdb99.png" 
          alt="TUMMY GOTCHI"
          className="max-w-[90vw] max-h-[200px] object-contain pixel-text-glow mx-auto"
          style={{
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 20px hsl(var(--accent) / 0.6))'
          }}
        />
        
        <p className="font-pixel text-sm md:text-base text-accent mt-4">
          Eat better. Evolve weirder. One poop at a time.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mb-8">
        <Button 
          onClick={onStart}
          className="pixel-button text-lg md:text-xl py-4 px-8 hover:scale-105 transform transition-all"
        >
          START! 🌟
        </Button>
      </div>

    </div>
  );
};

export default WelcomeScreen;