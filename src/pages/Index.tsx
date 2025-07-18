import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import GoalSelectionScreen from "@/components/GoalSelectionScreen";
import BlobSelectionScreen from "@/components/BlobSelectionScreen";
import HatchingScreen from "@/components/HatchingScreen";
import MeetPetScreen from "@/components/MeetPetScreen";
import GameScreen from "@/components/GameScreen";

type GameState = 'welcome' | 'goal-selection' | 'blob-selection' | 'hatching' | 'meet-pet' | 'game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedBlob, setSelectedBlob] = useState<string>('');
  const [petName, setPetName] = useState<string>('');

  const handleStart = () => {
    setGameState('goal-selection');
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setGameState('blob-selection');
  };

  const handleBlobSelect = (blobId: string) => {
    setSelectedBlob(blobId);
    // Set pet name based on blob selection
    const names = { sploosh: 'Sploosh', squirm: 'Squirm', fizz: 'Fizz' };
    setPetName(names[blobId as keyof typeof names] || 'Sploosh');
    setGameState('hatching');
  };

  const handleHatchingComplete = () => {
    setGameState('meet-pet');
  };

  const handleContinueToGame = () => {
    setGameState('game');
  };

  const handleFeedPet = () => {
    // TODO: Implement food selection screen
    console.log('Feed pet clicked!');
  };

  return (
    <div className="min-h-screen bg-background">
      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {gameState === 'goal-selection' && (
        <GoalSelectionScreen onGoalSelect={handleGoalSelect} />
      )}
      
      {gameState === 'blob-selection' && (
        <BlobSelectionScreen onBlobSelect={handleBlobSelect} />
      )}
      
      {gameState === 'hatching' && (
        <HatchingScreen 
          blobName={petName} 
          onHatchingComplete={handleHatchingComplete} 
        />
      )}
      
      {gameState === 'meet-pet' && (
        <MeetPetScreen 
          petName={petName} 
          onContinue={handleContinueToGame} 
        />
      )}
      
      {gameState === 'game' && (
        <GameScreen 
          petName={petName} 
          onFeedPet={handleFeedPet} 
        />
      )}
    </div>
  );
};

export default Index;
