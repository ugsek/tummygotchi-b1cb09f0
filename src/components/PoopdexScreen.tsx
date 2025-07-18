import { Button } from "@/components/ui/button";

interface PoopdexScreenProps {
  onBackToGame: () => void;
}

const poopCollection = [
  { id: 1, name: "Basic Blob", unlocked: true, weirdness: 2, triggers: "BASIC FOOD" },
  { id: 2, name: "Crusty Wiggler", unlocked: true, weirdness: 4, triggers: "VEGGIE + CANDY" },
  { id: 3, name: "Sparkle Swirl", unlocked: false, weirdness: 5, triggers: "???" },
  { id: 4, name: "Rainbow Rush", unlocked: false, weirdness: 5, triggers: "???" },
  // Add more poop types...
];

const PoopdexScreen = ({ onBackToGame }: PoopdexScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="border-4 border-accent bg-card p-4 mb-6">
        <h1 className="text-2xl font-pixel text-foreground text-center pixel-text-glow">
          POOPDEX
        </h1>
        <p className="text-sm font-pixel text-muted-foreground text-center mt-2">
          5/20 COLLECTED
        </p>
      </div>

      {/* Collection grid */}
      <div className="grid grid-cols-4 gap-4 mb-6 flex-1">
        {[...Array(16)].map((_, index) => {
          const poop = poopCollection[index];
          const isUnlocked = poop?.unlocked || false;
          
          return (
            <div
              key={index}
              className={`
                aspect-square border-2 flex flex-col items-center justify-center p-2
                ${isUnlocked 
                  ? 'border-accent bg-accent/10' 
                  : 'border-muted bg-muted/10'
                }
                ${index === 0 ? 'border-4 border-accent shadow-lg' : ''}
              `}
            >
              {isUnlocked ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full pixel-creature">
                    <div className="text-xs">💩</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-pixel text-muted">?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected poop info */}
      <div className="border-2 border-accent bg-card p-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center pixel-creature">
            <span className="text-lg">💩</span>
          </div>
          <div>
            <h2 className="text-lg font-pixel text-foreground">BASIC BLOB</h2>
            <p className="text-sm font-pixel text-muted-foreground">
              FOOD TRIGGERS: BASIC FOOD
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-pixel text-muted-foreground">WEIRDNESS:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < 2 ? 'text-accent' : 'text-muted'}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-center space-x-6 mb-4">
        <Button
          variant="outline"
          className="w-12 h-12 p-0 font-pixel text-xs"
        >
          ≡
        </Button>
        <Button
          onClick={onBackToGame}
          className="w-12 h-12 p-0 font-pixel text-xs"
        >
          🏠
        </Button>
        <Button
          variant="outline"
          className="w-12 h-12 p-0 font-pixel text-xs"
        >
          ⚙
        </Button>
      </div>
    </div>
  );
};

export default PoopdexScreen;