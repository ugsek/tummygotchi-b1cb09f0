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
  // === BASIC STARTER POOPS (1-5) ===
  {
    id: 'basic_blob',
    name: 'BASIC BLOB',
    emoji: '💩',
    weirdness: 1,
    rarity: 'common',
    description: 'Your first poop! Nothing special, but everyone starts here.',
    unlockConditions: { requiredFoods: [] },
    unlockHint: 'Eat anything!'
  },
  {
    id: 'mushy_mound',
    name: 'MUSHY MOUND',
    emoji: '🟤',
    weirdness: 2,
    rarity: 'common',
    description: 'Soft and squishy. Too much processed food?',
    unlockConditions: { requiredFoods: ['pizza', 'burger'], healthyRatio: 0.2 },
    unlockHint: 'Eat mostly junk food!'
  },
  {
    id: 'fiber_logs',
    name: 'FIBER LOGS',
    emoji: '🪵',
    weirdness: 2,
    rarity: 'common',
    description: 'Solid and well-formed. The power of vegetables!',
    unlockConditions: { requiredFoods: ['broccoli', 'spinach'], healthyRatio: 0.8 },
    unlockHint: 'Load up on fiber-rich veggies!'
  },
  {
    id: 'protein_pellets',
    name: 'PROTEIN PELLETS',
    emoji: '🔸',
    weirdness: 2,
    rarity: 'common',
    description: 'Dense and compact from high protein intake.',
    unlockConditions: { requiredFoods: ['chicken', 'eggs'] },
    unlockHint: 'Focus on protein sources!'
  },
  {
    id: 'sugar_crystals',
    name: 'SUGAR CRYSTALS',
    emoji: '💎',
    weirdness: 2,
    rarity: 'common',
    description: 'Sparkly from too much sugar intake.',
    unlockConditions: { requiredFoods: ['candy', 'chocolate'] },
    unlockHint: 'Indulge your sweet tooth!'
  },

  // === FOOD COMBO POOPS (6-25) ===
  {
    id: 'rainbow_swirl',
    name: 'RAINBOW SWIRL',
    emoji: '🌈',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Colorful from diverse fruits and vegetables!',
    unlockConditions: { requiredFoods: ['berries', 'carrot', 'spinach', 'banana'], healthyRatio: 0.9 },
    unlockHint: 'Eat a rainbow of colorful foods!'
  },
  {
    id: 'spicy_surprise',
    name: 'SPICY SURPRISE',
    emoji: '🌶️',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Burns on the way out! Too much hot sauce?',
    unlockConditions: { requiredFoods: ['chili', 'peppers'] },
    unlockHint: 'Add some heat to your meals!'
  },
  {
    id: 'cheese_mountain',
    name: 'CHEESE MOUNTAIN',
    emoji: '🧀',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Yellow and chunky from dairy overload.',
    unlockConditions: { requiredFoods: ['cheese', 'milk', 'yogurt'] },
    unlockHint: 'Go crazy with dairy!'
  },
  {
    id: 'coffee_bean',
    name: 'COFFEE BEAN',
    emoji: '☕',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Dark and bitter, just like your morning mood.',
    unlockConditions: { requiredFoods: ['coffee', 'espresso'] },
    unlockHint: 'Fuel up on caffeine!'
  },
  {
    id: 'nutty_crunch',
    name: 'NUTTY CRUNCH',
    emoji: '🥜',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Chunky texture from too many nuts.',
    unlockConditions: { requiredFoods: ['almonds', 'walnuts', 'peanuts'] },
    unlockHint: 'Go nuts with nuts!'
  },
  {
    id: 'fruit_explosion',
    name: 'FRUIT EXPLOSION',
    emoji: '🍓',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Sweet and colorful from fruit overload.',
    unlockConditions: { requiredFoods: ['apple', 'banana', 'berries', 'orange'] },
    unlockHint: 'Fruit salad for days!'
  },
  {
    id: 'veggie_medley',
    name: 'VEGGIE MEDLEY',
    emoji: '🥗',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Green and earthy from vegetable overload.',
    unlockConditions: { requiredFoods: ['broccoli', 'spinach', 'kale', 'cucumber'] },
    unlockHint: 'Become a vegetable!'
  },
  {
    id: 'grain_tower',
    name: 'GRAIN TOWER',
    emoji: '🌾',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Tall and structured from whole grains.',
    unlockConditions: { requiredFoods: ['quinoa', 'rice', 'oats'] },
    unlockHint: 'Build with grains!'
  },
  {
    id: 'seafood_special',
    name: 'SEAFOOD SPECIAL',
    emoji: '🐟',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Smells fishy but rich in omega-3s.',
    unlockConditions: { requiredFoods: ['salmon', 'tuna', 'shrimp'] },
    unlockHint: 'Swim in seafood!'
  },
  {
    id: 'dessert_disaster',
    name: 'DESSERT DISASTER',
    emoji: '🍰',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Sweet chaos from too many desserts.',
    unlockConditions: { requiredFoods: ['cake', 'ice_cream', 'cookies'] },
    unlockHint: 'Live in the dessert section!'
  },
  {
    id: 'breakfast_bonanza',
    name: 'BREAKFAST BONANZA',
    emoji: '🥞',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Morning glory from classic breakfast foods.',
    unlockConditions: { requiredFoods: ['pancakes', 'bacon', 'eggs'] },
    unlockHint: 'Make every meal breakfast!'
  },
  {
    id: 'pizza_party',
    name: 'PIZZA PARTY',
    emoji: '🍕',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Round and cheesy from pizza overindulgence.',
    unlockConditions: { requiredFoods: ['pizza', 'cheese', 'tomato'] },
    unlockHint: 'Pizza for breakfast, lunch, and dinner!'
  },
  {
    id: 'burger_bomb',
    name: 'BURGER BOMB',
    emoji: '🍔',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Stacked layers from burger binges.',
    unlockConditions: { requiredFoods: ['burger', 'beef', 'fries'] },
    unlockHint: 'Burger everything!'
  },
  {
    id: 'soup_slosh',
    name: 'SOUP SLOSH',
    emoji: '🍲',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Liquid consistency from too much soup.',
    unlockConditions: { requiredFoods: ['soup', 'broth', 'noodles'] },
    unlockHint: 'Slurp all the soups!'
  },
  {
    id: 'salad_stack',
    name: 'SALAD STACK',
    emoji: '🥬',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Leafy layers from salad obsession.',
    unlockConditions: { requiredFoods: ['lettuce', 'tomato', 'cucumber', 'olives'] },
    unlockHint: 'Salad is life!'
  },

  // === INTERNATIONAL CUISINE POOPS (26-50) ===
  {
    id: 'sushi_roll',
    name: 'SUSHI ROLL',
    emoji: '🍣',
    weirdness: 4,
    rarity: 'rare',
    description: 'Perfectly formed like a Japanese sushi master made it.',
    unlockConditions: { requiredFoods: ['sushi', 'rice', 'fish', 'seaweed'] },
    unlockHint: 'Master the art of Japanese cuisine!'
  },
  {
    id: 'pasta_perfection',
    name: 'PASTA PERFECTION',
    emoji: '🍝',
    weirdness: 4,
    rarity: 'rare',
    description: 'Long and twisted like Italian pasta.',
    unlockConditions: { requiredFoods: ['pasta', 'tomato', 'basil', 'cheese'] },
    unlockHint: 'Embrace Italian dining!'
  },
  {
    id: 'taco_twist',
    name: 'TACO TWIST',
    emoji: '🌮',
    weirdness: 4,
    rarity: 'rare',
    description: 'Folded and spicy from Mexican fiesta.',
    unlockConditions: { requiredFoods: ['taco', 'beans', 'avocado', 'salsa'] },
    unlockHint: 'Fiesta like there\'s no mañana!'
  },
  {
    id: 'curry_creation',
    name: 'CURRY CREATION',
    emoji: '🍛',
    weirdness: 4,
    rarity: 'rare',
    description: 'Golden and aromatic from Indian spices.',
    unlockConditions: { requiredFoods: ['curry', 'rice', 'turmeric', 'garam_masala'] },
    unlockHint: 'Spice up your life with Indian cuisine!'
  },
  {
    id: 'dim_sum_delight',
    name: 'DIM SUM DELIGHT',
    emoji: '🥟',
    weirdness: 4,
    rarity: 'rare',
    description: 'Small and steamed like Chinese dumplings.',
    unlockConditions: { requiredFoods: ['dumplings', 'pork', 'soy_sauce', 'ginger'] },
    unlockHint: 'Yum cha all day long!'
  },
  {
    id: 'baguette_baton',
    name: 'BAGUETTE BATON',
    emoji: '🥖',
    weirdness: 4,
    rarity: 'rare',
    description: 'Long and crusty like French bread.',
    unlockConditions: { requiredFoods: ['bread', 'cheese', 'wine', 'butter'] },
    unlockHint: 'Très français! Eat like a Parisian!'
  },
  {
    id: 'kimchi_kick',
    name: 'KIMCHI KICK',
    emoji: '🥬',
    weirdness: 4,
    rarity: 'rare',
    description: 'Fermented and fierce from Korean culture.',
    unlockConditions: { requiredFoods: ['kimchi', 'rice', 'seaweed', 'gochujang'] },
    unlockHint: 'K-food fever!'
  },
  {
    id: 'falafel_formation',
    name: 'FALAFEL FORMATION',
    emoji: '🧆',
    weirdness: 4,
    rarity: 'rare',
    description: 'Round and earthy from Middle Eastern cuisine.',
    unlockConditions: { requiredFoods: ['falafel', 'hummus', 'tahini', 'chickpeas'] },
    unlockHint: 'Middle Eastern feast mode!'
  },
  {
    id: 'paella_pile',
    name: 'PAELLA PILE',
    emoji: '🥘',
    weirdness: 4,
    rarity: 'rare',
    description: 'Saffron-yellow from Spanish seaside.',
    unlockConditions: { requiredFoods: ['paella', 'saffron', 'seafood', 'rice'] },
    unlockHint: 'Olé! Spanish feast time!'
  },
  {
    id: 'thai_typhoon',
    name: 'THAI TYPHOON',
    emoji: '🌶️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Fiery storm from Thai chili overload.',
    unlockConditions: { requiredFoods: ['pad_thai', 'tom_yum', 'thai_chili', 'coconut'] },
    unlockHint: 'Thai spice challenge accepted!'
  },
  {
    id: 'greek_goddess',
    name: 'GREEK GODDESS',
    emoji: '🫒',
    weirdness: 4,
    rarity: 'rare',
    description: 'Divine creation from Mediterranean diet.',
    unlockConditions: { requiredFoods: ['olives', 'feta', 'olive_oil', 'lamb'] },
    unlockHint: 'Mediterranean lifestyle activated!'
  },
  {
    id: 'brazilian_burst',
    name: 'BRAZILIAN BURST',
    emoji: '🇧🇷',
    weirdness: 4,
    rarity: 'rare',
    description: 'Tropical explosion from Brazilian flavors.',
    unlockConditions: { requiredFoods: ['acai', 'beans', 'mango', 'coconut'] },
    unlockHint: 'Carnival in your digestive system!'
  },
  {
    id: 'german_giant',
    name: 'GERMAN GIANT',
    emoji: '🌭',
    weirdness: 4,
    rarity: 'rare',
    description: 'Massive and substantial from hearty German food.',
    unlockConditions: { requiredFoods: ['sausage', 'sauerkraut', 'beer', 'pretzel'] },
    unlockHint: 'Oktoberfest every day!'
  },
  {
    id: 'russian_roulette',
    name: 'RUSSIAN ROULETTE',
    emoji: '🪆',
    weirdness: 4,
    rarity: 'rare',
    description: 'Nested surprise from Russian dolls... er, food.',
    unlockConditions: { requiredFoods: ['borscht', 'vodka', 'caviar', 'bread'] },
    unlockHint: 'Communist cuisine comrade!'
  },
  {
    id: 'moroccan_mirage',
    name: 'MOROCCAN MIRAGE',
    emoji: '🏜️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Exotic and aromatic from North African spices.',
    unlockConditions: { requiredFoods: ['tagine', 'couscous', 'dates', 'mint'] },
    unlockHint: 'Desert feast vibes!'
  },
  {
    id: 'ethiopian_experience',
    name: 'ETHIOPIAN EXPERIENCE',
    emoji: '🌋',
    weirdness: 4,
    rarity: 'rare',
    description: 'Spicy communal creation from injera sharing.',
    unlockConditions: { requiredFoods: ['injera', 'berbere', 'lentils', 'coffee'] },
    unlockHint: 'East African adventure!'
  },
  {
    id: 'peruvian_peak',
    name: 'PERUVIAN PEAK',
    emoji: '🏔️',
    weirdness: 4,
    rarity: 'rare',
    description: 'High-altitude creation from Andean cuisine.',
    unlockConditions: { requiredFoods: ['quinoa', 'potatoes', 'llama', 'chia'] },
    unlockHint: 'Inca empire diet!'
  },
  {
    id: 'caribbean_carnival',
    name: 'CARIBBEAN CARNIVAL',
    emoji: '🏝️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Tropical party from island flavors.',
    unlockConditions: { requiredFoods: ['plantain', 'jerk_spice', 'coconut', 'mango'] },
    unlockHint: 'Island life, mon!'
  },
  {
    id: 'scandinavian_saga',
    name: 'SCANDINAVIAN SAGA',
    emoji: '🐟',
    weirdness: 4,
    rarity: 'rare',
    description: 'Nordic creation from fish and berries.',
    unlockConditions: { requiredFoods: ['salmon', 'lingonberry', 'dill', 'rye'] },
    unlockHint: 'Viking feast mode!'
  },
  {
    id: 'lebanese_luxury',
    name: 'LEBANESE LUXURY',
    emoji: '🌿',
    weirdness: 4,
    rarity: 'rare',
    description: 'Herb-packed perfection from Levantine cuisine.',
    unlockConditions: { requiredFoods: ['tabbouleh', 'hummus', 'pita', 'parsley'] },
    unlockHint: 'Mediterranean mountain magic!'
  },
  {
    id: 'australian_adventure',
    name: 'AUSTRALIAN ADVENTURE',
    emoji: '🦘',
    weirdness: 4,
    rarity: 'rare',
    description: 'Down under delight from Aussie barbecue.',
    unlockConditions: { requiredFoods: ['kangaroo', 'vegemite', 'barramundi', 'macadamia'] },
    unlockHint: 'G\'day mate, time to eat!'
  },
  {
    id: 'turkish_treasure',
    name: 'TURKISH TREASURE',
    emoji: '🧿',
    weirdness: 4,
    rarity: 'rare',
    description: 'Ottoman empire elegance in excrement form.',
    unlockConditions: { requiredFoods: ['kebab', 'baklava', 'turkish_delight', 'yogurt'] },
    unlockHint: 'Istanbul bridge between worlds!'
  },
  {
    id: 'vietnamese_victory',
    name: 'VIETNAMESE VICTORY',
    emoji: '🍜',
    weirdness: 4,
    rarity: 'rare',
    description: 'Pho-nomenal creation from Vietnamese herbs.',
    unlockConditions: { requiredFoods: ['pho', 'fish_sauce', 'cilantro', 'lime'] },
    unlockHint: 'Pho real Vietnamese experience!'
  },
  {
    id: 'argentinian_asado',
    name: 'ARGENTINIAN ASADO',
    emoji: '🥩',
    weirdness: 4,
    rarity: 'rare',
    description: 'Meaty masterpiece from South American grill.',
    unlockConditions: { requiredFoods: ['beef', 'chimichurri', 'wine', 'empanada'] },
    unlockHint: 'Tango with meat!'
  },
  {
    id: 'polish_pierogi',
    name: 'POLISH PIEROGI',
    emoji: '🥟',
    weirdness: 4,
    rarity: 'rare',
    description: 'Pocket-shaped perfection from Eastern Europe.',
    unlockConditions: { requiredFoods: ['pierogi', 'potato', 'sour_cream', 'onion'] },
    unlockHint: 'Polish power meal!'
  },

  // === STREAK-BASED POOPS (51-80) ===
  {
    id: 'three_day_triumph',
    name: 'THREE DAY TRIUMPH',
    emoji: '🥉',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Bronze medal poop for 3-day logging streak.',
    unlockConditions: { requiredFoods: [], minDays: 3 },
    unlockHint: 'Log food for 3 days straight!'
  },
  {
    id: 'weekly_warrior',
    name: 'WEEKLY WARRIOR',
    emoji: '🥈',
    weirdness: 4,
    rarity: 'rare',
    description: 'Silver dedication from one week of logging.',
    unlockConditions: { requiredFoods: [], minDays: 7 },
    unlockHint: 'Keep logging for a full week!'
  },
  {
    id: 'fortnight_fighter',
    name: 'FORTNIGHT FIGHTER',
    emoji: '🥇',
    weirdness: 4,
    rarity: 'rare',
    description: 'Golden commitment from two weeks straight.',
    unlockConditions: { requiredFoods: [], minDays: 14 },
    unlockHint: 'Two weeks of dedication!'
  },
  {
    id: 'monthly_master',
    name: 'MONTHLY MASTER',
    emoji: '🏆',
    weirdness: 5,
    rarity: 'epic',
    description: 'Trophy-worthy achievement from monthly logging.',
    unlockConditions: { requiredFoods: [], minDays: 30 },
    unlockHint: 'One month of perfect tracking!'
  },
  {
    id: 'seasonal_sage',
    name: 'SEASONAL SAGE',
    emoji: '🌸',
    weirdness: 5,
    rarity: 'epic',
    description: 'Wise creation from three months of discipline.',
    unlockConditions: { requiredFoods: [], minDays: 90 },
    unlockHint: 'Three months of enlightenment!'
  },
  {
    id: 'anniversary_artifact',
    name: 'ANNIVERSARY ARTIFACT',
    emoji: '🎊',
    weirdness: 5,
    rarity: 'legendary',
    description: 'One year celebration poop! You did it!',
    unlockConditions: { requiredFoods: [], minDays: 365 },
    unlockHint: 'One full year of logging!'
  },
  {
    id: 'healthy_streak_starter',
    name: 'HEALTHY STREAK STARTER',
    emoji: '🌱',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Baby steps toward healthy eating habits.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.7, minDays: 3 },
    unlockHint: '3 days of mostly healthy eating!'
  },
  {
    id: 'wellness_week',
    name: 'WELLNESS WEEK',
    emoji: '🌿',
    weirdness: 4,
    rarity: 'rare',
    description: 'One week of consistently healthy choices.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.8, minDays: 7 },
    unlockHint: 'Week of healthy living!'
  },
  {
    id: 'nutrition_ninja',
    name: 'NUTRITION NINJA',
    emoji: '🥷',
    weirdness: 4,
    rarity: 'rare',
    description: 'Stealthy good eating for two weeks.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.85, minDays: 14 },
    unlockHint: 'Ninja-level healthy eating!'
  },
  {
    id: 'superfood_sensei',
    name: 'SUPERFOOD SENSEI',
    emoji: '🧘',
    weirdness: 5,
    rarity: 'epic',
    description: 'Master of nutrition for one month.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.9, minDays: 30 },
    unlockHint: 'Become a nutrition master!'
  },
  {
    id: 'zen_master',
    name: 'ZEN MASTER',
    emoji: '☯️',
    weirdness: 5,
    rarity: 'epic',
    description: 'Perfect balance achieved through mindful eating.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.95, minDays: 60 },
    unlockHint: 'Find your nutritional zen!'
  },
  {
    id: 'immortal_gut',
    name: 'IMMORTAL GUT',
    emoji: '⚡',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Legendary status: your gut is basically immortal.',
    unlockConditions: { requiredFoods: [], healthyRatio: 1.0, minDays: 100 },
    unlockHint: 'Achieve gut immortality!'
  },
  {
    id: 'protein_powerhouse',
    name: 'PROTEIN POWERHOUSE',
    emoji: '💪',
    weirdness: 4,
    rarity: 'rare',
    description: 'Gains from consistent protein intake.',
    unlockConditions: { requiredFoods: ['protein'], minDays: 7 },
    unlockHint: 'Protein every day for a week!'
  },
  {
    id: 'fiber_fanatic',
    name: 'FIBER FANATIC',
    emoji: '🌾',
    weirdness: 4,
    rarity: 'rare',
    description: 'Regular as clockwork from fiber dedication.',
    unlockConditions: { requiredFoods: ['fiber'], minDays: 10 },
    unlockHint: 'Fiber every day for 10 days!'
  },
  {
    id: 'omega_overlord',
    name: 'OMEGA OVERLORD',
    emoji: '🐟',
    weirdness: 4,
    rarity: 'rare',
    description: 'Brain food master from omega-3 consistency.',
    unlockConditions: { requiredFoods: ['fish', 'nuts'], minDays: 5 },
    unlockHint: 'Omega-3s for brain power!'
  },
  {
    id: 'antioxidant_ace',
    name: 'ANTIOXIDANT ACE',
    emoji: '🫐',
    weirdness: 4,
    rarity: 'rare',
    description: 'Youth serum from berry dedication.',
    unlockConditions: { requiredFoods: ['berries'], minDays: 7 },
    unlockHint: 'Berry good for you!'
  },
  {
    id: 'calcium_crusher',
    name: 'CALCIUM CRUSHER',
    emoji: '🦴',
    weirdness: 4,
    rarity: 'rare',
    description: 'Bone-strong from dairy devotion.',
    unlockConditions: { requiredFoods: ['milk', 'cheese'], minDays: 5 },
    unlockHint: 'Build those bones!'
  },
  {
    id: 'iron_legend',
    name: 'IRON LEGEND',
    emoji: '⚙️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Never tired from iron-rich foods.',
    unlockConditions: { requiredFoods: ['spinach', 'beef'], minDays: 7 },
    unlockHint: 'Iron up your diet!'
  },
  {
    id: 'vitamin_virtuoso',
    name: 'VITAMIN VIRTUOSO',
    emoji: '🎭',
    weirdness: 4,
    rarity: 'rare',
    description: 'Performance artist of nutrition.',
    unlockConditions: { requiredFoods: ['vegetables', 'fruits'], minDays: 14 },
    unlockHint: 'Vitamin symphony!'
  },
  {
    id: 'mineral_mogul',
    name: 'MINERAL MOGUL',
    emoji: '💎',
    weirdness: 4,
    rarity: 'rare',
    description: 'Rich in all the essential minerals.',
    unlockConditions: { requiredFoods: ['nuts', 'seeds'], minDays: 10 },
    unlockHint: 'Mine those minerals!'
  },
  {
    id: 'hydration_hero',
    name: 'HYDRATION HERO',
    emoji: '💧',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Perfectly moist from proper hydration.',
    unlockConditions: { requiredFoods: ['water'], minDays: 5 },
    unlockHint: 'Water is life!'
  },
  {
    id: 'consistency_king',
    name: 'CONSISTENCY KING',
    emoji: '👑',
    weirdness: 5,
    rarity: 'epic',
    description: 'Royal regularity from perfect habits.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.8, minDays: 21 },
    unlockHint: 'Rule your routine!'
  },
  {
    id: 'habit_hero',
    name: 'HABIT HERO',
    emoji: '🦸',
    weirdness: 5,
    rarity: 'epic',
    description: 'Superhuman discipline in food choices.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.9, minDays: 45 },
    unlockHint: 'Hero-level habit formation!'
  },
  {
    id: 'discipline_deity',
    name: 'DISCIPLINE DEITY',
    emoji: '⚡',
    weirdness: 5,
    rarity: 'legendary',
    description: 'God-tier self-control and consistency.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.95, minDays: 180 },
    unlockHint: 'Achieve divine discipline!'
  },
  {
    id: 'cheat_day_chaos',
    name: 'CHEAT DAY CHAOS',
    emoji: '🍕',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Earned indulgence after healthy streak.',
    unlockConditions: { requiredFoods: ['pizza', 'burger'], healthyRatio: 0.2, minDays: 1 },
    unlockHint: 'Earn your cheat day!'
  },
  {
    id: 'balance_beam',
    name: 'BALANCE BEAM',
    emoji: '⚖️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Perfect equilibrium between healthy and treats.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.75, minDays: 7 },
    unlockHint: 'Find the perfect balance!'
  },
  {
    id: 'moderation_master',
    name: 'MODERATION MASTER',
    emoji: '🎯',
    weirdness: 4,
    rarity: 'rare',
    description: 'Everything in moderation, including moderation.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.7, minDays: 14 },
    unlockHint: 'Master the art of moderation!'
  },
  {
    id: 'sustainable_sage',
    name: 'SUSTAINABLE SAGE',
    emoji: '🌍',
    weirdness: 5,
    rarity: 'epic',
    description: 'Wise choices for personal and planetary health.',
    unlockConditions: { requiredFoods: ['plant_based'], minDays: 30 },
    unlockHint: 'Eat for the planet!'
  },
  {
    id: 'mindful_muncher',
    name: 'MINDFUL MUNCHER',
    emoji: '🧠',
    weirdness: 4,
    rarity: 'rare',
    description: 'Conscious eating leads to conscious pooping.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.8, minDays: 10 },
    unlockHint: 'Eat with intention!'
  },
  {
    id: 'intuitive_intestine',
    name: 'INTUITIVE INTESTINE',
    emoji: '🎭',
    weirdness: 4,
    rarity: 'rare',
    description: 'Your gut knows what it wants.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.85, minDays: 21 },
    unlockHint: 'Trust your gut feelings!'
  },

  // === EXTREME COMBINATION POOPS (81-120) ===
  {
    id: 'fermented_funk',
    name: 'FERMENTED FUNK',
    emoji: '🧄',
    weirdness: 4,
    rarity: 'rare',
    description: 'Stinky but healthy from fermented foods!',
    unlockConditions: { requiredFoods: ['kimchi', 'yogurt', 'sauerkraut'] },
    unlockHint: 'Embrace fermented foods!'
  },
  {
    id: 'glitter_bomb',
    name: 'GLITTER BOMB',
    emoji: '✨',
    weirdness: 4,
    rarity: 'rare',
    description: 'Sparkles everywhere! Perfect nutrition balance.',
    unlockConditions: { requiredFoods: ['quinoa', 'avocado', 'berries'], healthyRatio: 0.95 },
    unlockHint: 'Achieve nutritional perfection!'
  },
  {
    id: 'ocean_waves',
    name: 'OCEAN WAVES',
    emoji: '🌊',
    weirdness: 4,
    rarity: 'rare',
    description: 'Blue-green from sea vegetables and fish.',
    unlockConditions: { requiredFoods: ['seaweed', 'fish'], forbiddenFoods: ['meat'] },
    unlockHint: 'Go pescatarian with sea foods!'
  },
  {
    id: 'golden_nuggets',
    name: 'GOLDEN NUGGETS',
    emoji: '🥇',
    weirdness: 4,
    rarity: 'rare',
    description: 'Valuable waste from expensive superfoods.',
    unlockConditions: { requiredFoods: ['truffle', 'caviar', 'saffron'] },
    unlockHint: 'Feast on luxury foods!'
  },
  {
    id: 'rocket_fuel',
    name: 'ROCKET FUEL',
    emoji: '🚀',
    weirdness: 5,
    rarity: 'epic',
    description: 'High-energy creation from superfoods.',
    unlockConditions: { requiredFoods: ['spirulina', 'maca', 'goji_berries', 'chia'] },
    unlockHint: 'Fuel up with superfoods!'
  },
  {
    id: 'detox_deluxe',
    name: 'DETOX DELUXE',
    emoji: '🌿',
    weirdness: 4,
    rarity: 'rare',
    description: 'Cleansing creation from detox foods.',
    unlockConditions: { requiredFoods: ['lemon', 'ginger', 'turmeric', 'celery'] },
    unlockHint: 'Cleanse your system!'
  },
  {
    id: 'breakfast_of_champions',
    name: 'BREAKFAST OF CHAMPIONS',
    emoji: '🏆',
    weirdness: 4,
    rarity: 'rare',
    description: 'Victory formation from champion breakfast.',
    unlockConditions: { requiredFoods: ['oats', 'berries', 'nuts', 'yogurt'] },
    unlockHint: 'Start your day like a champion!'
  },
  {
    id: 'midnight_snack_attack',
    name: 'MIDNIGHT SNACK ATTACK',
    emoji: '🌙',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Late night creation from nocturnal eating.',
    unlockConditions: { requiredFoods: ['cereal', 'milk', 'cookies'] },
    unlockHint: 'Raid the kitchen at midnight!'
  },
  {
    id: 'comfort_cloud',
    name: 'COMFORT CLOUD',
    emoji: '☁️',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Soft and comforting from feel-good foods.',
    unlockConditions: { requiredFoods: ['mac_cheese', 'ice_cream', 'chocolate'] },
    unlockHint: 'Embrace comfort food therapy!'
  },
  {
    id: 'energy_explosion',
    name: 'ENERGY EXPLOSION',
    emoji: '💥',
    weirdness: 4,
    rarity: 'rare',
    description: 'Bursting with power from energy foods.',
    unlockConditions: { requiredFoods: ['coffee', 'banana', 'nuts', 'dark_chocolate'] },
    unlockHint: 'Power up with energy foods!'
  },
  {
    id: 'immunity_fortress',
    name: 'IMMUNITY FORTRESS',
    emoji: '🛡️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Protective barrier from immune-boosting foods.',
    unlockConditions: { requiredFoods: ['garlic', 'ginger', 'citrus', 'honey'] },
    unlockHint: 'Build your immune defense!'
  },
  {
    id: 'brain_boost',
    name: 'BRAIN BOOST',
    emoji: '🧠',
    weirdness: 4,
    rarity: 'rare',
    description: 'Smart poop from brain-boosting nutrients.',
    unlockConditions: { requiredFoods: ['blueberries', 'walnuts', 'fish', 'dark_chocolate'] },
    unlockHint: 'Feed your brain!'
  },
  {
    id: 'heart_healthy',
    name: 'HEART HEALTHY',
    emoji: '❤️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Cardiovascular perfection from heart foods.',
    unlockConditions: { requiredFoods: ['oats', 'berries', 'fish', 'nuts'] },
    unlockHint: 'Love your heart!'
  },
  {
    id: 'beauty_boost',
    name: 'BEAUTY BOOST',
    emoji: '💅',
    weirdness: 4,
    rarity: 'rare',
    description: 'Glowing from beauty-enhancing foods.',
    unlockConditions: { requiredFoods: ['collagen', 'avocado', 'berries', 'seeds'] },
    unlockHint: 'Eat for beauty!'
  },
  {
    id: 'muscle_mass',
    name: 'MUSCLE MASS',
    emoji: '💪',
    weirdness: 4,
    rarity: 'rare',
    description: 'Gains visible in poop form.',
    unlockConditions: { requiredFoods: ['protein_powder', 'chicken', 'eggs', 'quinoa'] },
    unlockHint: 'Build those gains!'
  },
  {
    id: 'stress_relief',
    name: 'STRESS RELIEF',
    emoji: '😌',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Calm and peaceful from stress-reducing foods.',
    unlockConditions: { requiredFoods: ['chamomile', 'dark_chocolate', 'nuts'] },
    unlockHint: 'Eat your stress away!'
  },
  {
    id: 'sleep_support',
    name: 'SLEEP SUPPORT',
    emoji: '😴',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Dreamy creation from sleep-promoting foods.',
    unlockConditions: { requiredFoods: ['turkey', 'milk', 'cherries', 'almonds'] },
    unlockHint: 'Eat for better sleep!'
  },
  {
    id: 'mood_booster',
    name: 'MOOD BOOSTER',
    emoji: '😊',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Happy poop from mood-lifting foods.',
    unlockConditions: { requiredFoods: ['dark_chocolate', 'banana', 'berries'] },
    unlockHint: 'Eat happiness!'
  },
  {
    id: 'digestive_delight',
    name: 'DIGESTIVE DELIGHT',
    emoji: '🌸',
    weirdness: 4,
    rarity: 'rare',
    description: 'Perfect digestion from gut-friendly foods.',
    unlockConditions: { requiredFoods: ['probiotics', 'fiber', 'ginger'] },
    unlockHint: 'Love your gut!'
  },
  {
    id: 'metabolism_marvel',
    name: 'METABOLISM MARVEL',
    emoji: '🔥',
    weirdness: 4,
    rarity: 'rare',
    description: 'Burning calories even as waste!',
    unlockConditions: { requiredFoods: ['chili', 'green_tea', 'cinnamon'] },
    unlockHint: 'Fire up your metabolism!'
  },
  {
    id: 'longevity_legend',
    name: 'LONGEVITY LEGEND',
    emoji: '🧓',
    weirdness: 5,
    rarity: 'epic',
    description: 'Anti-aging masterpiece for eternal youth.',
    unlockConditions: { requiredFoods: ['turmeric', 'berries', 'fish', 'green_tea'] },
    unlockHint: 'Eat for eternal youth!'
  },
  {
    id: 'athletic_achievement',
    name: 'ATHLETIC ACHIEVEMENT',
    emoji: '🏃',
    weirdness: 4,
    rarity: 'rare',
    description: 'Performance poop from sports nutrition.',
    unlockConditions: { requiredFoods: ['protein', 'carbs', 'electrolytes'] },
    unlockHint: 'Fuel like an athlete!'
  },
  {
    id: 'recovery_rocket',
    name: 'RECOVERY ROCKET',
    emoji: '🚀',
    weirdness: 4,
    rarity: 'rare',
    description: 'Fast healing from recovery foods.',
    unlockConditions: { requiredFoods: ['protein', 'anti_inflammatory', 'vitamins'] },
    unlockHint: 'Recover like a champion!'
  },
  {
    id: 'hydration_hero',
    name: 'HYDRATION HERO',
    emoji: '💧',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Perfectly moist from optimal hydration.',
    unlockConditions: { requiredFoods: ['water', 'coconut_water', 'watermelon'] },
    unlockHint: 'Stay hydrated!'
  },
  {
    id: 'electrolyte_emperor',
    name: 'ELECTROLYTE EMPEROR',
    emoji: '⚡',
    weirdness: 4,
    rarity: 'rare',
    description: 'Electrically charged from perfect mineral balance.',
    unlockConditions: { requiredFoods: ['banana', 'coconut_water', 'sports_drink'] },
    unlockHint: 'Balance those electrolytes!'
  },
  {
    id: 'alkaline_artisan',
    name: 'ALKALINE ARTISAN',
    emoji: '🎨',
    weirdness: 4,
    rarity: 'rare',
    description: 'pH-balanced perfection from alkaline foods.',
    unlockConditions: { requiredFoods: ['lemon', 'spinach', 'cucumber', 'avocado'] },
    unlockHint: 'Balance your pH!'
  },
  {
    id: 'acidic_adventure',
    name: 'ACIDIC ADVENTURE',
    emoji: '🍋',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Tangy creation from acidic foods.',
    unlockConditions: { requiredFoods: ['citrus', 'tomato', 'vinegar'] },
    unlockHint: 'Embrace the acid!'
  },
  {
    id: 'raw_revelation',
    name: 'RAW REVELATION',
    emoji: '🥗',
    weirdness: 4,
    rarity: 'rare',
    description: 'Pure and unprocessed from raw food diet.',
    unlockConditions: { requiredFoods: ['raw_vegetables', 'raw_fruits', 'raw_nuts'] },
    unlockHint: 'Go completely raw!'
  },
  {
    id: 'cooked_comfort',
    name: 'COOKED COMFORT',
    emoji: '🍲',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Warm and cozy from cooked foods.',
    unlockConditions: { requiredFoods: ['soup', 'stew', 'roasted_vegetables'] },
    unlockHint: 'Warm up with cooked foods!'
  },
  {
    id: 'frozen_fantasy',
    name: 'FROZEN FANTASY',
    emoji: '🧊',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Cool creation from frozen treats.',
    unlockConditions: { requiredFoods: ['ice_cream', 'popsicle', 'frozen_yogurt'] },
    unlockHint: 'Chill out with frozen foods!'
  },
  {
    id: 'spice_storm',
    name: 'SPICE STORM',
    emoji: '🌪️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Whirlwind of flavor from spice overload.',
    unlockConditions: { requiredFoods: ['cumin', 'paprika', 'cinnamon', 'cardamom'] },
    unlockHint: 'Spice up your life!'
  },
  {
    id: 'herb_heaven',
    name: 'HERB HEAVEN',
    emoji: '🌿',
    weirdness: 4,
    rarity: 'rare',
    description: 'Aromatic perfection from fresh herbs.',
    unlockConditions: { requiredFoods: ['basil', 'cilantro', 'parsley', 'mint'] },
    unlockHint: 'Herbalize everything!'
  },
  {
    id: 'salt_sensation',
    name: 'SALT SENSATION',
    emoji: '🧂',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Salty surprise from sodium overload.',
    unlockConditions: { requiredFoods: ['salt', 'pickles', 'olives'] },
    unlockHint: 'Salt all the things!'
  },
  {
    id: 'sweet_symphony',
    name: 'SWEET SYMPHONY',
    emoji: '🎵',
    weirdness: 3,
    rarity: 'uncommon',
    description: 'Musical creation from sugar harmony.',
    unlockConditions: { requiredFoods: ['honey', 'maple_syrup', 'fruit'] },
    unlockHint: 'Sweeten the deal!'
  },
  {
    id: 'bitter_beauty',
    name: 'BITTER BEAUTY',
    emoji: '🖤',
    weirdness: 4,
    rarity: 'rare',
    description: 'Dark elegance from bitter compounds.',
    unlockConditions: { requiredFoods: ['dark_chocolate', 'coffee', 'kale'] },
    unlockHint: 'Embrace the bitter side!'
  },
  {
    id: 'umami_universe',
    name: 'UMAMI UNIVERSE',
    emoji: '🌌',
    weirdness: 4,
    rarity: 'rare',
    description: 'Fifth taste dimension from umami foods.',
    unlockConditions: { requiredFoods: ['mushrooms', 'soy_sauce', 'cheese', 'tomato'] },
    unlockHint: 'Explore the umami universe!'
  },
  {
    id: 'texture_tornado',
    name: 'TEXTURE TORNADO',
    emoji: '🌪️',
    weirdness: 4,
    rarity: 'rare',
    description: 'Chaotic mix of textures in one meal.',
    unlockConditions: { requiredFoods: ['crunchy', 'smooth', 'chewy', 'crispy'] },
    unlockHint: 'Mix all the textures!'
  },
  {
    id: 'temperature_tango',
    name: 'TEMPERATURE TANGO',
    emoji: '💃',
    weirdness: 4,
    rarity: 'rare',
    description: 'Hot and cold dance in your digestive system.',
    unlockConditions: { requiredFoods: ['hot_soup', 'ice_cream'] },
    unlockHint: 'Hot and cold together!'
  },
  {
    id: 'color_carnival',
    name: 'COLOR CARNIVAL',
    emoji: '🎪',
    weirdness: 4,
    rarity: 'rare',
    description: 'Rainbow celebration from colorful foods.',
    unlockConditions: { requiredFoods: ['red_food', 'orange_food', 'yellow_food', 'green_food', 'blue_food'] },
    unlockHint: 'Eat every color!'
  },
  {
    id: 'season_special',
    name: 'SEASON SPECIAL',
    emoji: '🍂',
    weirdness: 4,
    rarity: 'rare',
    description: 'Seasonal perfection from time-appropriate foods.',
    unlockConditions: { requiredFoods: ['seasonal_vegetables', 'seasonal_fruits'] },
    unlockHint: 'Eat with the seasons!'
  },

  // === LEGENDARY ULTRA-RARE POOPS (121-151) ===
  {
    id: 'cosmic_coil',
    name: 'COSMIC COIL',
    emoji: '🌌',
    weirdness: 5,
    rarity: 'epic',
    description: 'Otherworldly spiral pattern from perfect mineral balance.',
    unlockConditions: { requiredFoods: ['spirulina', 'chlorella', 'sea_salt'], healthyRatio: 1.0, minDays: 7 },
    unlockHint: 'Achieve cosmic consciousness through nutrition!'
  },
  {
    id: 'volcanic_eruption',
    name: 'VOLCANIC ERUPTION',
    emoji: '🌋',
    weirdness: 5,
    rarity: 'epic',
    description: 'Explosive release from extreme spicy combinations.',
    unlockConditions: { requiredFoods: ['carolina_reaper', 'ghost_pepper', 'habanero'] },
    unlockHint: 'Handle the spiciest foods known!'
  },
  {
    id: 'time_capsule',
    name: 'TIME CAPSULE',
    emoji: '⏰',
    weirdness: 5,
    rarity: 'epic',
    description: 'Ancient grains create prehistoric masterpiece.',
    unlockConditions: { requiredFoods: ['amaranth', 'teff', 'quinoa', 'chia'], minDays: 21 },
    unlockHint: 'Master ancient nutrition wisdom!'
  },
  {
    id: 'diamond_dynasty',
    name: 'DIAMOND DYNASTY',
    emoji: '💎',
    weirdness: 5,
    rarity: 'epic',
    description: 'Precious creation from rare expensive foods.',
    unlockConditions: { requiredFoods: ['truffle', 'caviar', 'saffron', 'wagyu'] },
    unlockHint: 'Dine like royalty!'
  },
  {
    id: 'phoenix_rebirth',
    name: 'PHOENIX REBIRTH',
    emoji: '🔥',
    weirdness: 5,
    rarity: 'epic',
    description: 'Rise from ashes of dietary transformation.',
    unlockConditions: { requiredFoods: [], healthyRatio: 0.95, minDays: 66 },
    unlockHint: 'Transform your diet completely!'
  },
  {
    id: 'celestial_symphony',
    name: 'CELESTIAL SYMPHONY',
    emoji: '🎼',
    weirdness: 5,
    rarity: 'epic',
    description: 'Harmonious creation from perfect food combinations.',
    unlockConditions: { requiredFoods: ['harmony_foods'], healthyRatio: 0.9, minDays: 30 },
    unlockHint: 'Create perfect food harmony!'
  },
  {
    id: 'quantum_quirk',
    name: 'QUANTUM QUIRK',
    emoji: '⚛️',
    weirdness: 5,
    rarity: 'epic',
    description: 'Exists in multiple states simultaneously.',
    unlockConditions: { requiredFoods: ['molecular_gastronomy'], minDays: 5 },
    unlockHint: 'Enter the molecular kitchen!'
  },
  {
    id: 'galaxy_guardian',
    name: 'GALAXY GUARDIAN',
    emoji: '🛸',
    weirdness: 5,
    rarity: 'epic',
    description: 'Protects the universe through superior nutrition.',
    unlockConditions: { requiredFoods: ['superfoods'], healthyRatio: 1.0, minDays: 50 },
    unlockHint: 'Become a nutritional guardian!'
  },
  {
    id: 'elemental_essence',
    name: 'ELEMENTAL ESSENCE',
    emoji: '🔮',
    weirdness: 5,
    rarity: 'epic',
    description: 'Channels all four elements of nutrition.',
    unlockConditions: { requiredFoods: ['earth_foods', 'water_foods', 'fire_foods', 'air_foods'] },
    unlockHint: 'Master all nutritional elements!'
  },
  {
    id: 'infinity_icon',
    name: 'INFINITY ICON',
    emoji: '♾️',
    weirdness: 5,
    rarity: 'epic',
    description: 'Endless cycle of perfect nutrition.',
    unlockConditions: { requiredFoods: [], healthyRatio: 1.0, minDays: 77 },
    unlockHint: 'Achieve infinite nutritional wisdom!'
  },
  {
    id: 'unicorn_magic',
    name: 'UNICORN MAGIC',
    emoji: '🦄',
    weirdness: 5,
    rarity: 'legendary',
    description: 'The legendary rainbow poop! Mythical perfection.',
    unlockConditions: { requiredFoods: ['rainbow_foods'], healthyRatio: 1.0, minDays: 100 },
    unlockHint: 'Achieve mythical status!'
  },
  {
    id: 'dragon_breath',
    name: 'DRAGON BREATH',
    emoji: '🐉',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Legendary spicy poop that steams when it hits the bowl.',
    unlockConditions: { requiredFoods: ['dragon_pepper', 'fire_sauce'], minDays: 30 },
    unlockHint: 'Survive the ultimate fire trial!'
  },
  {
    id: 'philosophers_stone',
    name: 'PHILOSOPHER\'S STONE',
    emoji: '🪨',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Ultimate poop. Grants eternal digestive wisdom.',
    unlockConditions: { requiredFoods: ['wisdom_foods'], healthyRatio: 1.0, minDays: 150 },
    unlockHint: 'Achieve ultimate enlightenment!'
  },
  {
    id: 'golden_god',
    name: 'GOLDEN GOD',
    emoji: '👑',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Divine creation worthy of worship.',
    unlockConditions: { requiredFoods: ['golden_foods'], healthyRatio: 1.0, minDays: 200 },
    unlockHint: 'Ascend to nutritional godhood!'
  },
  {
    id: 'reality_bender',
    name: 'REALITY BENDER',
    emoji: '🌀',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Bends the laws of digestion and reality.',
    unlockConditions: { requiredFoods: ['impossible_foods'], healthyRatio: 1.0, minDays: 250 },
    unlockHint: 'Transcend physical limitations!'
  },
  {
    id: 'multiverse_master',
    name: 'MULTIVERSE MASTER',
    emoji: '🌐',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Controls nutrition across all dimensions.',
    unlockConditions: { requiredFoods: ['dimensional_foods'], healthyRatio: 1.0, minDays: 300 },
    unlockHint: 'Master all universes!'
  },
  {
    id: 'time_lord',
    name: 'TIME LORD',
    emoji: '🕰️',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Controls time through superior diet.',
    unlockConditions: { requiredFoods: ['temporal_foods'], healthyRatio: 1.0, minDays: 365 },
    unlockHint: 'Master time itself!'
  },
  {
    id: 'creation_catalyst',
    name: 'CREATION CATALYST',
    emoji: '🎆',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Sparks new life through perfect nutrition.',
    unlockConditions: { requiredFoods: ['life_foods'], healthyRatio: 1.0, minDays: 400 },
    unlockHint: 'Become the source of all nutrition!'
  },
  {
    id: 'omega_point',
    name: 'OMEGA POINT',
    emoji: '🎯',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Final evolution of digestive perfection.',
    unlockConditions: { requiredFoods: ['omega_foods'], healthyRatio: 1.0, minDays: 500 },
    unlockHint: 'Reach the omega point of nutrition!'
  },
  {
    id: 'alpha_and_omega',
    name: 'ALPHA AND OMEGA',
    emoji: '🌟',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Beginning and end of all nutrition.',
    unlockConditions: { requiredFoods: ['alpha_foods', 'omega_foods'], healthyRatio: 1.0, minDays: 600 },
    unlockHint: 'Become nutrition incarnate!'
  },
  {
    id: 'eternal_essence',
    name: 'ETERNAL ESSENCE',
    emoji: '💫',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Timeless perfection beyond mortal understanding.',
    unlockConditions: { requiredFoods: ['eternal_foods'], healthyRatio: 1.0, minDays: 777 },
    unlockHint: 'Achieve eternal nutritional enlightenment!'
  },
  {
    id: 'universal_unity',
    name: 'UNIVERSAL UNITY',
    emoji: '🕉️',
    weirdness: 5,
    rarity: 'legendary',
    description: 'One with all nutrition in the universe.',
    unlockConditions: { requiredFoods: ['unity_foods'], healthyRatio: 1.0, minDays: 888 },
    unlockHint: 'Become one with universal nutrition!'
  },
  {
    id: 'transcendent_truth',
    name: 'TRANSCENDENT TRUTH',
    emoji: '☯️',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Ultimate truth revealed through perfect diet.',
    unlockConditions: { requiredFoods: ['truth_foods'], healthyRatio: 1.0, minDays: 999 },
    unlockHint: 'Discover the ultimate nutritional truth!'
  },
  {
    id: 'infinite_perfection',
    name: 'INFINITE PERFECTION',
    emoji: '✨',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Perfect in every conceivable way. The ultimate achievement.',
    unlockConditions: { requiredFoods: ['perfection_foods'], healthyRatio: 1.0, minDays: 1000 },
    unlockHint: 'Achieve infinite perfection!'
  },
  {
    id: 'legendary_legacy',
    name: 'LEGENDARY LEGACY',
    emoji: '🏛️',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Your nutritional legacy will be remembered forever.',
    unlockConditions: { requiredFoods: ['legacy_foods'], healthyRatio: 1.0, minDays: 1111 },
    unlockHint: 'Create your eternal nutritional legacy!'
  },
  {
    id: 'mythical_monument',
    name: 'MYTHICAL MONUMENT',
    emoji: '🗿',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Monument to your incredible dietary dedication.',
    unlockConditions: { requiredFoods: ['monument_foods'], healthyRatio: 1.0, minDays: 1234 },
    unlockHint: 'Build a monument to nutrition!'
  },
  {
    id: 'cosmic_crown',
    name: 'COSMIC CROWN',
    emoji: '👑',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Crown jewel of the nutritional universe.',
    unlockConditions: { requiredFoods: ['crown_foods'], healthyRatio: 1.0, minDays: 1500 },
    unlockHint: 'Claim your cosmic crown!'
  },
  {
    id: 'divine_destiny',
    name: 'DIVINE DESTINY',
    emoji: '🌠',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Your destined greatness in nutritional form.',
    unlockConditions: { requiredFoods: ['destiny_foods'], healthyRatio: 1.0, minDays: 1800 },
    unlockHint: 'Fulfill your divine nutritional destiny!'
  },
  {
    id: 'ultimate_unity',
    name: 'ULTIMATE UNITY',
    emoji: '🔗',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Unity of all nutritional knowledge and practice.',
    unlockConditions: { requiredFoods: ['all_foods'], healthyRatio: 1.0, minDays: 2000 },
    unlockHint: 'Unite all nutritional wisdom!'
  },
  {
    id: 'final_form',
    name: 'FINAL FORM',
    emoji: '🎭',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Your final evolution in nutritional mastery.',
    unlockConditions: { requiredFoods: ['evolution_foods'], healthyRatio: 1.0, minDays: 2500 },
    unlockHint: 'Achieve your final nutritional form!'
  },
  {
    id: 'eternal_emperor',
    name: 'ETERNAL EMPEROR',
    emoji: '🏺',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Rules over all nutrition for eternity.',
    unlockConditions: { requiredFoods: ['emperor_foods'], healthyRatio: 1.0, minDays: 3000 },
    unlockHint: 'Rule the nutritional empire!'
  },
  {
    id: 'supreme_sovereign',
    name: 'SUPREME SOVEREIGN',
    emoji: '⚡',
    weirdness: 5,
    rarity: 'legendary',
    description: 'Supreme ruler of digestive destiny.',
    unlockConditions: { requiredFoods: ['sovereign_foods'], healthyRatio: 1.0, minDays: 3333 },
    unlockHint: 'Become the supreme nutritional sovereign!'
  },
  {
    id: 'absolute_apex',
    name: 'ABSOLUTE APEX',
    emoji: '🔺',
    weirdness: 5,
    rarity: 'legendary',
    description: 'The absolute peak of all possible achievement.',
    unlockConditions: { requiredFoods: ['apex_foods'], healthyRatio: 1.0, minDays: 4000 },
    unlockHint: 'Reach the absolute apex of nutrition!'
  },
  {
    id: 'impossible_dream',
    name: 'IMPOSSIBLE DREAM',
    emoji: '🌈',
    weirdness: 5,
    rarity: 'legendary',
    description: 'The impossible made possible through dedication.',
    unlockConditions: { requiredFoods: ['dream_foods'], healthyRatio: 1.0, minDays: 5000 },
    unlockHint: 'Make the impossible dream reality!'
  }
];

// Helper functions
export const getPoopsByRarity = (rarity: PoopType['rarity']) => 
  POOP_DATABASE.filter(poop => poop.rarity === rarity);

export const getPoopById = (id: string) => 
  POOP_DATABASE.find(poop => poop.id === id);

export const getTotalPoopCount = () => POOP_DATABASE.length;