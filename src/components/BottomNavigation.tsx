import { Button } from "@/components/ui/button";
import { Home, Book, Utensils } from "lucide-react";

interface BottomNavigationProps {
  onNavigateToHome: () => void;
  onNavigateToPoopdex: () => void;
  onNavigateToFeed: () => void;
  currentState: string;
}

const BottomNavigation = ({ 
  onNavigateToHome, 
  onNavigateToPoopdex, 
  onNavigateToFeed,
  currentState 
}: BottomNavigationProps) => {
  // Don't show navigation during onboarding or certain flow states
  const hideNavigation = [
    'welcome', 
    'goal-selection', 
    'blob-selection', 
    'hatching', 
    'meet-pet',
    'squeeze',
    'ai-analysis'
  ].includes(currentState);

  if (hideNavigation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-accent p-4">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Button
          variant={currentState === 'poopdex' ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToPoopdex}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Book className="h-4 w-4" />
          <span className="text-xs font-pixel">POOPDEX</span>
        </Button>
        
        <Button
          variant={currentState === 'game' ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToHome}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Home className="h-4 w-4" />
          <span className="text-xs font-pixel">HOME</span>
        </Button>
        
        <Button
          variant={currentState.includes('food') || currentState.includes('emoji') || currentState.includes('photo') ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToFeed}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Utensils className="h-4 w-4" />
          <span className="text-xs font-pixel">FEED</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;