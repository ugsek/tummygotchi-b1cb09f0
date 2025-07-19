// Comprehensive poop database with combinations and rarities
export interface PoopType {
  id: string;
  name: string;
  emoji: string;
  weirdness: number; // 1-5 stars
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  unlockConditions: {
    requiredFoods: string[];
    forbiddenFoods?: string[];
    healthyRatio?: number; // 0-1, percentage of healthy foods needed
    minDays?: number;
  };
  unlockHint: string;
}

export const POOP_DATABASE: PoopType[] = [
  // Common Poops (1-2 stars)
  {
    id: 'basic_blob',
    name: 'BASIC BLOB',
    emoji: '💩',
    weirdness: 1,
    rarity: 'common',
    description: 'Your first poop! Nothing special, but everyone starts here.',
    unlockConditions: {
      requiredFoods: [],
    },
    unlockHint: 'Eat anything!'
  },
  {
    id: 'mushy_mound',
    name: 'MUSHY MOUND',
    emoji: '🟤',
    weirdness: 2,
    rarity: 'common',
    description: 'Soft and squishy. Too much processed food?',
    unlockConditions: {
      requiredFoods: ['pizza', 'burger', 'fries'],
      healthyRatio: 0.2, // 20% or less healthy food
    },
    unlockHint: 'Eat mostly junk food!'
  },
  {
    id: 'fiber_logs',
    name: 'FIBER LOGS',
    emoji: '🪵',
    weirdness: 2,
    rarity: 'common',
    description: 'Solid and well-formed. The power of vegetables!',
    unlockConditions: {
      requiredFoods: ['broccoli', 'spinach', 'beans'],
      healthyRatio: 0.8, // 80% healthy food
    },
    unlockHint: 'Load up on fiber-rich veggies!'
  },

  // Uncommon Poops (2-3 stars)
  {
    id: 'rainbow_swirl',
    name: 'RAINBOW SWIRL',
    emoji: '🌈',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Colorful from diverse fruits and vegetables!',
    unlockConditions: {
      requiredFoods: ['berries', 'carrot', 'spinach', 'banana'],
      healthyRatio: 0.9,
    },
    unlockHint: 'Eat a rainbow of colorful foods!'
  },
  {
    id: 'protein_pellets',
    name: 'PROTEIN PELLETS',
    emoji: '🔸',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Dense and compact from high protein intake.',
    unlockConditions: {
      requiredFoods: ['chicken', 'eggs', 'tofu', 'fish'],
      forbiddenFoods: ['candy', 'soda'],
    },
    unlockHint: 'Focus on protein sources!'
  },
  {
    id: 'spicy_surprise',
    name: 'SPICY SURPRISE',
    emoji: '🌶️',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Burns on the way out! Too much hot sauce?',
    unlockConditions: {
      requiredFoods: ['chili', 'peppers', 'curry'],
    },
    unlockHint: 'Add some heat to your meals!'
  },
  {
    id: 'sugar_crystals',
    name: 'SUGAR CRYSTALS',
    emoji: '💎',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Sparkly from too much sugar intake.',
    unlockConditions: {
      requiredFoods: ['candy', 'chocolate', 'soda'],
      healthyRatio: 0.3,
    },
    unlockHint: 'Indulge your sweet tooth!'
  },

  // Rare Poops (3-4 stars)
  {
    id: 'fermented_funk',
    name: 'FERMENTED FUNK',
    emoji: '🧀',
    weirdness: 4,
    rarity: 'rare',
    description: 'Stinky but healthy from fermented foods!',
    unlockConditions: {
      requiredFoods: ['kimchi', 'yogurt', 'cheese', 'pickles'],
    },
    unlockHint: 'Embrace fermented foods!'
  },
  {
    id: 'glitter_bomb',
    name: 'GLITTER BOMB',
    emoji: '✨',
    weirdness: 4,
    rarity: 'rare',
    description: 'Sparkles everywhere! Perfect nutrition balance.',
    unlockConditions: {
      requiredFoods: ['quinoa', 'avocado', 'nuts', 'berries'],
      healthyRatio: 0.95,
      minDays: 3,
    },
    unlockHint: 'Maintain perfect healthy eating for 3+ days!'
  },
  {
    id: 'ocean_waves',
    name: 'OCEAN WAVES',
    emoji: '🌊',
    weirdness: 4,
    rarity: 'rare',
    description: 'Blue-green from sea vegetables and fish.',
    unlockConditions: {
      requiredFoods: ['fish', 'seaweed', 'algae'],
      forbiddenFoods: ['meat'],
    },
    unlockHint: 'Go pescatarian with sea foods!'
  },
  {
    id: 'golden_nuggets',
    name: 'GOLDEN NUGGETS',
    emoji: '🥇',
    weirdness: 4,
    rarity: 'rare',
    description: 'Valuable waste from expensive superfoods.',
    unlockConditions: {
      requiredFoods: ['avocado', 'quinoa', 'salmon', 'nuts'],
      healthyRatio: 0.9,
    },
    unlockHint: 'Feast on premium superfoods!'
  },

  // Epic Poops (4-5 stars)
  {
    id: 'cosmic_coil',
    name: 'COSMIC COIL',
    emoji: '🌌',
    weirdness: 5,
    rarity: 'epic',
    description: 'Otherworldly spiral pattern from perfect mineral balance.',
    unlockConditions: {
      requiredFoods: ['spinach', 'nuts', 'seeds', 'quinoa', 'berries'],
      forbiddenFoods: ['processed', 'sugar'],
      healthyRatio: 1.0,
      minDays: 5,
    },
    unlockHint: 'Achieve 100% clean eating for 5+ days!'
  },
  {
    id: 'volcanic_eruption',
    name: 'VOLCANIC ERUPTION',
    emoji: '🌋',
    weirdness: 5,
    rarity: 'epic',
    description: 'Explosive release from extreme spicy food combinations.',
    unlockConditions: {
      requiredFoods: ['habanero', 'ghost_pepper', 'chili', 'curry'],
    },
    unlockHint: 'Handle the spiciest foods known to mankind!'
  },
  {
    id: 'time_capsule',
    name: 'TIME CAPSULE',
    emoji: '⏰',
    weirdness: 5,
    rarity: 'epic',
    description: 'Ancient grains create a prehistoric masterpiece.',
    unlockConditions: {
      requiredFoods: ['quinoa', 'amaranth', 'chia', 'buckwheat'],
      healthyRatio: 0.95,
    },
    unlockHint: 'Master the ancient grains!'
  },

  // Legendary Poops (5 stars)
  {
    id: 'unicorn_magic',
    name: 'UNICORN MAGIC',
    emoji: '🦄',
    weirdness: 5,
    rarity: 'legendary',
    description: 'The legendary rainbow poop! Perfect everything.',
    unlockConditions: {
      requiredFoods: ['berries', 'spinach', 'quinoa', 'avocado', 'nuts', 'fish'],
      forbiddenFoods: ['processed', 'sugar', 'junk'],
      healthyRatio: 1.0,
      minDays: 7,
    },
    unlockHint: 'Achieve absolute nutritional perfection for a full week!'
  },
  {
    id: 'dragon_breath',
    name: 'DRAGON BREATH',
    emoji: '🐉',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Legendary spicy poop that steams when it hits the bowl.',
    unlockConditions: {
      requiredFoods: ['carolina_reaper', 'ghost_pepper', 'habanero', 'scotch_bonnet'],
      minDays: 3,
    },
    unlockHint: 'Survive the ultimate spice challenge for 3 days!'
  },
  {
    id: 'philosophers_stone',
    name: 'PHILOSOPHERS STONE',
    emoji: '🪨',
    weirdness: 5,
    rarity: 'legendary',
    description: 'The ultimate poop. Rumored to grant eternal digestive health.',
    unlockConditions: {
      requiredFoods: ['kale', 'quinoa', 'blueberries', 'salmon', 'walnuts', 'chia'],
      forbiddenFoods: ['processed', 'sugar', 'alcohol', 'caffeine'],
      healthyRatio: 1.0,
      minDays: 10,
    },
    unlockHint: 'Transcend mortal nutrition for 10 pure days!'
  }
];

// Helper functions
export const getPoopsByRarity = (rarity: PoopType['rarity']) => 
  POOP_DATABASE.filter(poop => poop.rarity === rarity);

export const getPoopById = (id: string) => 
  POOP_DATABASE.find(poop => poop.id === id);

export const getTotalPoopCount = () => POOP_DATABASE.length;