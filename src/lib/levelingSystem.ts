// Leveling system for Tummygotchi MVP (up to level 100)

export const calculateLevel = (experiencePoints: number): number => {
  if (experiencePoints < 0) return 1;
  
  // Progressive XP requirements: level 1 = 0 XP, level 2 = 100 XP, level 3 = 250 XP, etc.
  // Formula: level = floor(sqrt(experiencePoints / 50)) + 1, capped at 100
  const level = Math.floor(Math.sqrt(experiencePoints / 50)) + 1;
  return Math.min(level, 100);
};

export const getExperienceForLevel = (level: number): number => {
  if (level <= 1) return 0;
  // Reverse calculation: XP needed for a specific level
  return Math.pow(level - 1, 2) * 50;
};

export const getExperienceToNextLevel = (currentExp: number, currentLevel: number): number => {
  if (currentLevel >= 100) return 0; // Max level reached
  
  const nextLevelExp = getExperienceForLevel(currentLevel + 1);
  return nextLevelExp - currentExp;
};

export const calculateExperienceGain = (foods: string[], isHealthy: boolean, weirdnessBoost: number): number => {
  let baseExp = 10; // Base XP per meal
  
  // Bonus for healthy foods
  if (isHealthy && weirdnessBoost > 2) {
    baseExp += 15; // Healthy meals give more XP
  }
  
  // Bonus for variety (different food types)
  const uniqueFoods = new Set(foods);
  if (uniqueFoods.size > 1) {
    baseExp += uniqueFoods.size * 5; // 5 XP per unique food
  }
  
  // Bonus for high weirdness meals (nutritious combinations)
  if (weirdnessBoost >= 3) {
    baseExp += 10; // Super healthy meals
  }
  
  return baseExp;
};

// Fun level titles for the MVP
export const getLevelTitle = (level: number): string => {
  if (level >= 90) return "POOP LEGEND";
  if (level >= 80) return "BELLY MASTER";
  if (level >= 70) return "NUTRITION NINJA";
  if (level >= 60) return "FOOD WIZARD";
  if (level >= 50) return "HEALTH HERO";
  if (level >= 40) return "VEGGIE VIKING";
  if (level >= 30) return "FIBER FIGHTER";
  if (level >= 20) return "SNACK SCHOLAR";
  if (level >= 10) return "MEAL ROOKIE";
  return "HUNGRY NEWBIE";
};