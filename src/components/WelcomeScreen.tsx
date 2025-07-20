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
        <h1 className="font-pixel text-4xl md:text-6xl mb-4 pixel-text-glow">
          TUMMY
        </h1>
        <h1 className="font-pixel text-4xl md:text-6xl mb-6 pixel-text-glow text-primary">
          GOTCHI
        </h1>
        
        <p className="font-pixel text-sm md:text-base text-accent mb-2">
          Welcome to your
        </p>
        <p className="font-pixel text-sm md:text-base text-accent">
          weird belly
        </p>
        <p className="font-pixel text-sm md:text-base text-accent">
          adventure!
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

      {/* Tagline */}
      <p className="font-pixel text-xs text-muted-foreground">
        Eat better. Evolve weirder. One poop at a time.
      </p>
    </div>
  );
};

export default WelcomeScreen;