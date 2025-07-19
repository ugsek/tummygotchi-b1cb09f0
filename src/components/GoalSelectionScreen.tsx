import { Button } from "@/components/ui/button";

interface Goal {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

interface GoalSelectionScreenProps {
  onGoalSelect: (goalId: string) => void;
  onSkip: () => void;
}

const goals: Goal[] = [
  {
    id: "healthy",
    emoji: "🍎",
    title: "EAT MORE",
    description: "HEALTHY STUFF"
  },
  {
    id: "stronger", 
    emoji: "💪",
    title: "GET STRONGER",
    description: ""
  },
  {
    id: "tummy",
    emoji: "😌", 
    title: "HELP MY TUMMY",
    description: "FEEL BETTER"
  },
  {
    id: "fun",
    emoji: "🧠",
    title: "JUST WANNA HAVE",
    description: "FUN WITH FOOD!"
  }
];

const GoalSelectionScreen = ({ onGoalSelect, onSkip }: GoalSelectionScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Floating creature */}
      <div className="mb-8 text-center">
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
                className="absolute w-1 h-1 bg-accent"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        <h2 className="font-pixel text-xl md:text-2xl text-accent mb-2">
          WHAT DO YOU WANT YOUR
        </h2>
        <h2 className="font-pixel text-xl md:text-2xl text-accent">
          TUMMYGOTCHI TO HELP YOU WITH?
        </h2>
      </div>

      {/* Goal options */}
      <div className="w-full max-w-md space-y-4">
        {goals.map((goal) => (
          <Button
            key={goal.id}
            onClick={() => onGoalSelect(goal.id)}
            className="w-full pixel-button text-left p-4 h-auto flex items-center space-x-4 hover:scale-105 transform transition-all"
          >
            <span className="text-2xl">{goal.emoji}</span>
            <div className="flex-1">
              <div className="font-pixel text-sm text-accent">
                {goal.title}
              </div>
              {goal.description && (
                <div className="font-pixel text-sm text-accent">
                  {goal.description}
                </div>
              )}
            </div>
            <div className="w-4 h-4 border-2 border-accent"></div>
          </Button>
        ))}
      </div>
      
      {/* Skip button */}
      <div className="mt-8">
        <Button 
          onClick={onSkip}
          variant="outline"
          className="pixel-button text-sm py-2 px-6 hover:scale-105 transform transition-all"
        >
          SKIP TO GAME
        </Button>
      </div>
    </div>
  );
};

export default GoalSelectionScreen;