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
import PlopScreen from "@/components/PlopScreen";
import ChatScreen from "@/components/ChatScreen";
import ChatIntroScreen from "@/components/ChatIntroScreen";
import { generatePoopFromCombination } from "@/lib/poopGenerator";
import { getPoopById } from "@/data/poopDatabase";
import { calculateLevel, calculateExperienceGain } from "@/lib/levelingSystem";

type GameState = 'welcome' | 'goal-selection' | 'blob-selection' | 'hatching' | 'meet-pet' | 'chat-intro' | 'game' | 'food-mode-selection' | 'emoji-tap' | 'photo-mode' | 'ai-analysis' | 'food-reaction' | 'ready-to-poop' | 'squeeze' | 'plop' | 'new-poop-unlocked' | 'food-tip' | 'poopdex' | 'chat';

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
  const [unlockedPoops, setUnlockedPoops] = useState<string[]>(['basic_blob', 'mushy_mound', 'rainbow_swirl']);
  const [level, setLevel] = useState<number>(1);
  const [experiencePoints, setExperiencePoints] = useState<number>(0);
  const [lastEatenFoods, setLastEatenFoods] = useState<string[]>([]);
  const [totalMealsEaten, setTotalMealsEaten] = useState<number>(0);

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

  const handleContinueToGame = (customName?: string) => {
    if (customName) {
      setPetName(customName);
    }
    setGameState('chat-intro');
  };

  const handleChatIntroComplete = () => {
    setGameState('chat');
  };

  const handleSkipChatIntro = () => {
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
    
    // Track last eaten foods and total meals
    setLastEatenFoods(selectedFoods);
    setTotalMealsEaten(prev => prev + 1);
    
    // Handle inappropriate content penalty
    if (weirdnessBoost < 0) {
      const newWeirdness = Math.max(0, weirdnessLevel + (weirdnessBoost * 10));
      setWeirdnessLevel(newWeirdness);
      setGameState('game');
      return;
    }
    
    // Calculate experience gain
    const isHealthy = weirdnessBoost > 2;
    const expGain = calculateExperienceGain(selectedFoods, isHealthy, weirdnessBoost);
    const newExp = experiencePoints + expGain;
    const newLevel = calculateLevel(newExp);
    
    // Update experience and level
    setExperiencePoints(newExp);
    if (newLevel > level) {
      setLevel(newLevel);
      // Could show level up animation here in the future
    }
    
    // Normal weirdness boost
    const dailyBoost = weirdnessBoost * 10; // Each healthy meal adds 10-30 points
    const newWeirdness = Math.min(100, weirdnessLevel + dailyBoost);
    setWeirdnessLevel(newWeirdness);
    
    // Automatically trigger pooping when weirdness reaches 100% (regardless of days)
    if (newWeirdness >= 100) {
      setShowFoodTipAfterPoop(true);
      // Add a small delay for dramatic effect, then auto-trigger squeeze
      setTimeout(() => {
        setGameState('squeeze');
      }, 2000);
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
    
    // Show PLOP animation first
    setGameState('plop');
  };

  const handlePlopComplete = () => {
    // After PLOP animation, show the new poop unlocked screen
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
    setGameState('emoji-tap');
  };

  const handleNavigateToChat = () => {
    setGameState('chat');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
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

      {gameState === 'chat-intro' && (
        <ChatIntroScreen 
          petName={petName} 
          onContinue={handleChatIntroComplete} 
          onSkip={handleSkipChatIntro}
        />
      )}
      
      {gameState === 'game' && (
        <GameScreen 
          petName={petName} 
          weirdnessLevel={weirdnessLevel}
          daysLogged={daysLogged}
          level={level}
          experiencePoints={experiencePoints}
          lastEatenFoods={lastEatenFoods}
          totalMealsEaten={totalMealsEaten}
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
          userGoal={selectedGoal}
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
      
      {gameState === 'plop' && (
        <PlopScreen 
          petName={petName}
          poopEmoji={(() => {
            const poop = getPoopById(lastPoopType);
            return poop?.emoji || '💩';
          })()}
          onPlopComplete={handlePlopComplete}
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

      {gameState === 'chat' && (
        <ChatScreen 
          petName={petName}
          userGoal={selectedGoal}
          onBackToGame={handleBackToGame}
        />
      )}
      
      <BottomNavigation
        currentState={gameState}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToPoopdex={handleNavigateToPoopdex}
        onNavigateToChat={handleNavigateToChat}
      />
    </div>
  );
};

export default Index;
