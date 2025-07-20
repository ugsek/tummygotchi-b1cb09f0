import { Button } from "@/components/ui/button";

interface ChatIntroScreenProps {
  petName: string;
  onContinue: () => void;
  onSkip: () => void;
}

const ChatIntroScreen = ({ petName, onContinue, onSkip }: ChatIntroScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Pet character with speech bubble */}
      <div className="mb-8 text-center relative">
        <div className="w-32 h-32 mx-auto mb-6 pixel-creature wiggle">
          <div className="w-full h-full bg-primary rounded-full relative">
            {/* Eyes */}
            <div className="absolute top-6 left-6 w-6 h-6 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-3 h-3 bg-background rounded-full"></div>
            </div>
            <div className="absolute top-6 right-6 w-6 h-6 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-3 h-3 bg-background rounded-full"></div>
            </div>
            {/* Mouth */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-background rounded-full"></div>
            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
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

        {/* Speech bubble */}
        <div className="relative bg-background border-4 border-accent rounded-lg p-4 max-w-xs mx-auto">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-accent"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-background"></div>
          
          <div className="font-pixel text-sm text-accent text-center">
            Hi! I'm {petName.toUpperCase()}! 
            <br />
            <span className="text-primary">💬 ASK ME ANYTHING</span>
            <br />
            about food!
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-pixel text-2xl text-accent mb-4 pixel-text-glow">
          CHAT TIME! 🗣️
        </h2>
        <p className="font-pixel text-sm text-muted-foreground mb-2">
          Your pet gut knows lots
        </p>
        <p className="font-pixel text-sm text-muted-foreground">
          about healthy eating!
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button 
          onClick={onContinue}
          className="pixel-button text-lg py-4 px-8 hover:scale-105 transform transition-all"
        >
          CHAT! 💬
        </Button>
        
        <Button 
          onClick={onSkip}
          variant="outline"
          className="pixel-button text-sm py-2 px-6 hover:scale-105 transform transition-all"
        >
          LATER! ⏩
        </Button>
      </div>
    </div>
  );
};

export default ChatIntroScreen;