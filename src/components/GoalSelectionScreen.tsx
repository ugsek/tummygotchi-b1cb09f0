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
        <div className="mx-auto mb-6">
          <img 
            src="/lovable-uploads/9900e95a-56f5-4b98-aeec-ac041a8ecd2b.png" 
            alt="Tummy Gotchi Title" 
            className="w-auto h-32 mx-auto pixel-art"
          />
        </div>
        
        <h2 className="font-pixel text-xl md:text-2xl text-accent mb-2">
          PICK YOUR GOAL! 🎯
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
          SKIP! ⏩
        </Button>
      </div>
    </div>
  );
};

export default GoalSelectionScreen;