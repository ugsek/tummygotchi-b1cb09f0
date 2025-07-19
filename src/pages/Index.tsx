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
import FoodReactionScreen from "@/components/FoodReactionScreen";
import { generatePoopFromCombination } from "@/lib/poopGenerator";

type GameState = 'welcome' | 'goal-selection' | 'blob-selection' | 'hatching' | 'meet-pet' | 'game' | 'food-mode-selection' | 'emoji-tap' | 'photo-mode' | 'ai-analysis' | 'food-reaction' | 'ready-to-poop' | 'squeeze' | 'new-poop-unlocked' | 'food-tip' | 'poopdex';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedBlob, setSelectedBlob] = useState<string>('');
  const [petName, setPetName] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [lastPoopType, setLastPoopType] = useState<string>('');
  const [showFoodTipAfterPoop, setShowFoodTipAfterPoop] = useState<boolean>(false);
  const [weirdnessLevel, setWeirdnessLevel] = useState<number>(0);
  const [daysLogged, setDaysLogged] = useState<number>(0);
  const [lastLoggedDate, setLastLoggedDate] = useState<string>('');
  const [unlockedPoops, setUnlockedPoops] = useState<string[]>(['basic_blob']);

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
    setGameState('emoji-tap');
  };

  const handleSelectEmojiTap = () => {
    setGameState('emoji-tap');
  };

  const handleSelectPhotoMode = () => {
    setGameState('photo-mode');
  };

  const handleEmojiConfirm = (foods: string[]) => {
    setSelectedFoods(foods);
    setGameState('food-reaction');
  };

  const handlePhotoTaken = (imageData: string) => {
    setCapturedImage(imageData);
    setGameState('ai-analysis');
  };

  const handleAnalysisComplete = (foods: string[]) => {
    setSelectedFoods(foods);
    setGameState('food-reaction');
  };

  const handleFoodReaction = (weirdnessBoost: number) => {
    const today = new Date().toDateString();
    let newDaysLogged = daysLogged;
    
    // Check if this is a new day
    if (lastLoggedDate !== today) {
      newDaysLogged = daysLogged + 1;
      setDaysLogged(newDaysLogged);
      setLastLoggedDate(today);
    }
    
    // Handle inappropriate content penalty
    if (weirdnessBoost < 0) {
      const newWeirdness = Math.max(0, weirdnessLevel + (weirdnessBoost * 10));
      setWeirdnessLevel(newWeirdness);
      setGameState('game');
      return;
    }
    
    // Normal weirdness boost (but only significant on healthy days)
    const dailyBoost = weirdnessBoost * 10; // Each healthy meal adds 10-30 points
    const newWeirdness = Math.min(100, weirdnessLevel + dailyBoost);
    setWeirdnessLevel(newWeirdness);
    
    // Need 3 days of logging AND 100% weirdness to poop
    if (newDaysLogged >= 3 && newWeirdness >= 100) {
      setShowFoodTipAfterPoop(true);
      setGameState('ready-to-poop');
    } else {
      setGameState('game');
    }
  };

  const handleSqueezeNow = () => {
    setGameState('squeeze');
  };

  const handlePoopComplete = (poopType: string) => {
    // Generate new poop based on food combination
    const newPoop = generatePoopFromCombination(selectedFoods, daysLogged, unlockedPoops);
    setLastPoopType(newPoop.id);
    
    // Add to unlocked poops if it's new
    if (!unlockedPoops.includes(newPoop.id)) {
      setUnlockedPoops(prev => [...prev, newPoop.id]);
    }
    
    setWeirdnessLevel(0); // Reset weirdness after pooping
    setDaysLogged(0); // Reset days counter
    if (showFoodTipAfterPoop) {
      setGameState('food-tip');
      setShowFoodTipAfterPoop(false);
    } else {
      setGameState('new-poop-unlocked');
    }
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
    setGameState('emoji-tap');
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
          weirdnessLevel={weirdnessLevel}
          daysLogged={daysLogged}
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
        <EmojiTapScreen 
          onConfirm={handleEmojiConfirm}
          onPhotoTaken={handlePhotoTaken}
        />
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
      
      {gameState === 'food-reaction' && (
        <FoodReactionScreen 
          foods={selectedFoods}
          userGoal={selectedGoal}
          currentWeirdness={weirdnessLevel}
          onContinue={handleFoodReaction}
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
          poopType={lastPoopType}
          foods={selectedFoods}
          onAddToPoopdex={handleAddToPoopdex}
          onGetFoodTip={handleGetFoodTip}
        />
      )}
      
      {gameState === 'food-tip' && (
        <FoodTipScreen 
          petName={petName}
          foods={selectedFoods}
          userGoal={selectedGoal}
          poopType={lastPoopType}
          onBackToGame={handleBackToGame}
        />
      )}
      
      {gameState === 'poopdex' && (
        <PoopdexScreen onBackToGame={handleBackToGame} unlockedPoops={unlockedPoops} />
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
