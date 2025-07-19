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
          variant={currentState.includes('food') || currentState.includes('emoji') || currentState.includes('photo') ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToFeed}
          className="flex items-center justify-center h-12 w-12 rounded-xl"
        >
          <Utensils className="h-5 w-5" />
        </Button>
        
        <Button
          variant={currentState === 'game' ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToHome}
          className="flex items-center justify-center h-12 w-12 rounded-xl"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <Button
          variant={currentState === 'poopdex' ? 'default' : 'outline'}
          size="sm"
          onClick={onNavigateToPoopdex}
          className="flex items-center justify-center h-12 w-12 rounded-xl"
        >
          <Book className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;