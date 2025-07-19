import { POOP_DATABASE, PoopType, getPoopById } from '@/data/poopDatabase';

interface FoodCombination {
  foods: string[];
  healthyRatio: number;
  daysLogged: number;
}

// Normalize food names for better matching
const normalizeFoodName = (food: string): string => {
  return food.toLowerCase().trim();
};

// Check if a food item matches any of the required foods
const foodMatches = (userFood: string, requiredFoods: string[]): boolean => {
  const normalizedUserFood = normalizeFoodName(userFood);
  return requiredFoods.some(required => {
    const normalizedRequired = normalizeFoodName(required);
    return normalizedUserFood.includes(normalizedRequired) || 
           normalizedRequired.includes(normalizedUserFood);
  });
};

// Calculate how healthy the food combination is
const calculateHealthyRatio = (foods: string[]): number => {
  const healthyFoods = [
    'broccoli', 'spinach', 'kale', 'carrot', 'berries', 'blueberries', 
    'quinoa', 'salmon', 'fish', 'nuts', 'walnuts', 'chia', 'avocado',
    'beans', 'lentils', 'tofu', 'yogurt', 'eggs', 'chicken', 'seeds',
    'apple', 'banana', 'orange', 'tomato', 'cucumber', 'bell_pepper'
  ];
  
  const unhealthyFoods = [
    'pizza', 'burger', 'fries', 'candy', 'chocolate', 'soda', 'chips',
    'donut', 'cookie', 'cake', 'ice_cream', 'processed'
  ];

  let healthyCount = 0;
  let unhealthyCount = 0;

  foods.forEach(food => {
    if (foodMatches(food, healthyFoods)) {
      healthyCount++;
    } else if (foodMatches(food, unhealthyFoods)) {
      unhealthyCount++;
    }
  });

  const totalCategorizedFoods = healthyCount + unhealthyCount;
  if (totalCategorizedFoods === 0) return 0.5; // Neutral if no categorized foods
  
  return healthyCount / totalCategorizedFoods;
};

// Check if unlock conditions are met
const checkUnlockConditions = (
  poop: PoopType, 
  combination: FoodCombination
): boolean => {
  const { requiredFoods, forbiddenFoods, healthyRatio, minDays } = poop.unlockConditions;
  
  // Check required foods
  if (requiredFoods.length > 0) {
    const hasRequiredFoods = requiredFoods.every(required =>
      combination.foods.some(userFood => foodMatches(userFood, [required]))
    );
    if (!hasRequiredFoods) return false;
  }
  
  // Check forbidden foods
  if (forbiddenFoods && forbiddenFoods.length > 0) {
    const hasForbiddenFoods = forbiddenFoods.some(forbidden =>
      combination.foods.some(userFood => foodMatches(userFood, [forbidden]))
    );
    if (hasForbiddenFoods) return false;
  }
  
  // Check healthy ratio
  if (healthyRatio !== undefined) {
    if (combination.healthyRatio < healthyRatio) return false;
  }
  
  // Check minimum days
  if (minDays !== undefined) {
    if (combination.daysLogged < minDays) return false;
  }
  
  return true;
};

// Generate poop based on food combination
export const generatePoopFromCombination = (
  foods: string[], 
  daysLogged: number,
  unlockedPoops: string[] = []
): PoopType => {
  const healthyRatio = calculateHealthyRatio(foods);
  const combination: FoodCombination = {
    foods,
    healthyRatio,
    daysLogged
  };

  // Find all eligible poops that haven't been unlocked yet
  const eligiblePoops = POOP_DATABASE.filter(poop => 
    !unlockedPoops.includes(poop.id) && 
    checkUnlockConditions(poop, combination)
  );

  if (eligiblePoops.length === 0) {
    // If no new poops can be unlocked, return a random unlocked one or basic blob
    const availablePoops = unlockedPoops.length > 0 
      ? unlockedPoops.map(id => getPoopById(id)).filter(Boolean) as PoopType[]
      : [POOP_DATABASE[0]]; // Basic blob as fallback
    
    return availablePoops[Math.floor(Math.random() * availablePoops.length)];
  }

  // Sort by rarity (prioritize rarer poops)
  const rarityOrder = { 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
  eligiblePoops.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);

  // Return the rarest eligible poop
  return eligiblePoops[0];
};

// Get hint for next possible poop unlock
export const getNextPoopHint = (
  foods: string[], 
  daysLogged: number,
  unlockedPoops: string[] = []
): string => {
  const combination: FoodCombination = {
    foods,
    healthyRatio: calculateHealthyRatio(foods),
    daysLogged
  };

  // Find next possible poop to unlock
  const nextPoops = POOP_DATABASE.filter(poop => 
    !unlockedPoops.includes(poop.id)
  );

  // Sort by how close we are to unlocking them
  const closePoops = nextPoops.filter(poop => {
    const conditions = poop.unlockConditions;
    
    // Check if we're close to meeting conditions
    let score = 0;
    
    if (conditions.requiredFoods.length > 0) {
      const matchedFoods = conditions.requiredFoods.filter(required =>
        combination.foods.some(userFood => foodMatches(userFood, [required]))
      );
      score += matchedFoods.length / conditions.requiredFoods.length;
    }
    
    if (conditions.healthyRatio !== undefined) {
      score += Math.min(1, combination.healthyRatio / conditions.healthyRatio);
    }
    
    return score > 0.3; // At least 30% progress
  });

  if (closePoops.length > 0) {
    const hint = closePoops[0].unlockHint;
    return `Try this: ${hint}`;
  }

  return "Keep experimenting with different food combinations!";
};

// Check if a poop is newly unlocked
export const isNewlyUnlocked = (
  poopId: string, 
  foods: string[], 
  daysLogged: number,
  previouslyUnlocked: string[]
): boolean => {
  const poop = getPoopById(poopId);
  if (!poop || previouslyUnlocked.includes(poopId)) return false;

  const combination: FoodCombination = {
    foods,
    healthyRatio: calculateHealthyRatio(foods),
    daysLogged
  };

  return checkUnlockConditions(poop, combination);
};