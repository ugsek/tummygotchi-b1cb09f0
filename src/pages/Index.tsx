import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import GoalSelectionScreen from "@/components/GoalSelectionScreen";
import BlobSelectionScreen from "@/components/BlobSelectionScreen";
import HatchingScreen from "@/components/HatchingScreen";
import MeetPetScreen from "@/components/MeetPetScreen";
import GameScreen from "@/components/GameScreen";
import FoodModeSelectionScreen from "@/components/FoodModeSelectionScreen";
import EmojiTapScreen from "@/components/EmojiTapScreen";
import PhotoModeScreen from "@/components/PhotoModeScreen";
import AIFoodAnalysisScreen from "@/components/AIFoodAnalysisScreen";
import ReadyToPoopScreen from "@/components/ReadyToPoopScreen";
import SqueezeScreen from "@/components/SqueezeScreen";
import NewPoopUnlockedScreen from "@/components/NewPoopUnlockedScreen";
import FoodTipScreen from "@/components/FoodTipScreen";
import PoopdexScreen from "@/components/PoopdexScreen";
import BottomNavigation from "@/components/BottomNavigation";

type GameState = 'welcome' | 'goal-selection' | 'blob-selection' | 'hatching' | 'meet-pet' | 'game' | 'food-mode-selection' | 'emoji-tap' | 'photo-mode' | 'ai-analysis' | 'ready-to-poop' | 'squeeze' | 'new-poop-unlocked' | 'food-tip' | 'poopdex';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedBlob, setSelectedBlob] = useState<string>('');
  const [petName, setPetName] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const handleStart = () => {
    setGameState('goal-selection');
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setGameState('blob-selection');
  };

  const handleBlobSelect = (blobId: string) => {
    setSelectedBlob(blobId);
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
    setGameState('food-mode-selection');
  };

  const handleSelectEmojiTap = () => {
    setGameState('emoji-tap');
  };

  const handleSelectPhotoMode = () => {
    setGameState('photo-mode');
  };

  const handleEmojiConfirm = (foods: string[]) => {
    setSelectedFoods(foods);
    setGameState('ready-to-poop');
  };

  const handlePhotoTaken = (imageData: string) => {
    setCapturedImage(imageData);
    setGameState('ai-analysis');
  };

  const handleAnalysisComplete = (foods: string[]) => {
    setSelectedFoods(foods);
    setGameState('ready-to-poop');
  };

  const handleSqueezeNow = () => {
    setGameState('squeeze');
  };

  const handlePoopComplete = (poopType: string) => {
    setGameState('new-poop-unlocked');
  };

  const handleAddToPoopdex = () => {
    setGameState('poopdex');
  };

  const handleGetFoodTip = () => {
    setGameState('food-tip');
  };

  const handleBackToGame = () => {
    setGameState('game');
  };

  const handleSkipOnboarding = () => {
    // Set default values and skip to game
    setSelectedGoal('healthy');
    setSelectedBlob('sploosh');
    setPetName('Sploosh');
    setGameState('game');
  };

  const handleNavigateToHome = () => {
    setGameState('game');
  };

  const handleNavigateToPoopdex = () => {
    setGameState('poopdex');
  };

  const handleNavigateToFeed = () => {
    setGameState('food-mode-selection');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} onSkip={handleSkipOnboarding} />
      )}
      
      {gameState === 'goal-selection' && (
        <GoalSelectionScreen onGoalSelect={handleGoalSelect} onSkip={handleSkipOnboarding} />
      )}
      
      {gameState === 'blob-selection' && (
        <BlobSelectionScreen onBlobSelect={handleBlobSelect} onSkip={handleSkipOnboarding} />
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
      
      {gameState === 'food-mode-selection' && (
        <FoodModeSelectionScreen 
          petName={petName}
          onSelectEmojiTap={handleSelectEmojiTap}
          onSelectPhotoMode={handleSelectPhotoMode}
        />
      )}
      
      {gameState === 'emoji-tap' && (
        <EmojiTapScreen onConfirm={handleEmojiConfirm} />
      )}
      
      {gameState === 'photo-mode' && (
        <PhotoModeScreen onPhotoTaken={handlePhotoTaken} />
      )}
      
      {gameState === 'ai-analysis' && (
        <AIFoodAnalysisScreen 
          imageData={capturedImage}
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}
      
      {gameState === 'ready-to-poop' && (
        <ReadyToPoopScreen 
          petName={petName}
          onSqueezeNow={handleSqueezeNow}
        />
      )}
      
      {gameState === 'squeeze' && (
        <SqueezeScreen 
          petName={petName}
          onPoopComplete={handlePoopComplete}
        />
      )}
      
      {gameState === 'new-poop-unlocked' && (
        <NewPoopUnlockedScreen 
          poopType="crusty_wiggler"
          onAddToPoopdex={handleAddToPoopdex}
          onGetFoodTip={handleGetFoodTip}
        />
      )}
      
      {gameState === 'food-tip' && (
        <FoodTipScreen 
          petName={petName}
          onBackToGame={handleBackToGame}
        />
      )}
      
      {gameState === 'poopdex' && (
        <PoopdexScreen onBackToGame={handleBackToGame} />
      )}
      
      <BottomNavigation
        currentState={gameState}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToPoopdex={handleNavigateToPoopdex}
        onNavigateToFeed={handleNavigateToFeed}
      />
    </div>
  );
};

export default Index;
