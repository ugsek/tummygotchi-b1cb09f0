import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ReadyToPoopScreenProps {
  petName: string;
  onSqueezeNow: () => void;
}

const ReadyToPoopScreen = ({ petName, onSqueezeNow }: ReadyToPoopScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="border-4 border-accent bg-card p-6 w-full max-w-lg">
        {/* Poop Weirdness indicator */}
        <div className="border-2 border-accent bg-accent/10 p-4 mb-6">
          <h2 className="text-lg font-pixel text-foreground text-center mb-4 pixel-text-glow">
            POOP WEIRDNESS 100%
          </h2>
          <Progress value={100} className="h-6 bg-muted mb-2" />
          <p className="text-center text-sm font-pixel text-accent">+0%</p>
        </div>

        {/* Message */}
        <h1 className="text-xl font-pixel text-foreground text-center mb-2 pixel-text-glow">
          YOUR PET IS READY
        </h1>
        <h2 className="text-xl font-pixel text-foreground text-center mb-8 pixel-text-glow">
          TO POOP!
        </h2>

        {/* Pet character - excited/ready state */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
              {/* Multiple eyes positioned around */}
              <div className="absolute top-4 left-6 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              <div className="absolute top-4 right-6 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              <div className="absolute top-6 left-3 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              
              {/* Happy/excited mouth */}
              <div className="absolute bottom-6 w-8 h-4 bg-accent rounded-full flex items-center justify-center">
                <div className="w-6 h-2 bg-background rounded-full"></div>
              </div>
              
              {/* Sparkles and excitement effects */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 text-accent font-pixel text-xl animate-pulse"
                  style={{
                    left: `${-30 + Math.random() * 160}%`,
                    top: `${-30 + Math.random() * 160}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  +
                </div>
              ))}
            </div>
            
            {/* Excitement sparkles around pet */}
            <div className="absolute -top-2 -left-2 w-4 h-4 text-accent font-pixel text-2xl animate-bounce">✦</div>
            <div className="absolute -top-2 -right-2 w-4 h-4 text-accent font-pixel text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>✦</div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 text-accent font-pixel text-2xl animate-bounce" style={{ animationDelay: '1s' }}>✦</div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 text-accent font-pixel text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>✦</div>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={onSqueezeNow}
          className="w-full h-16 text-xl font-pixel pixel-button mb-4"
        >
          SQUEEZE NOW!
        </Button>

        {/* Bottom navigation indicators */}
        <div className="flex justify-center space-x-6 text-accent">
          <div className="w-6 h-6 border border-accent flex items-center justify-center font-pixel text-xs">≡</div>
          <div className="w-6 h-6 border border-accent flex items-center justify-center font-pixel text-xs">🏠</div>
          <div className="w-6 h-6 border border-accent flex items-center justify-center font-pixel text-xs">⚙</div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToPoopScreen;