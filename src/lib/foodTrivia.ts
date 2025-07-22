// Food trivia system for educational and entertaining content
import { getCurrentMealPeriod } from "./timeSensitiveMessages";

interface FoodTrivia {
  fact: string;
  emoji: string;
  category: 'funny' | 'healthy' | 'surprising' | 'historical' | 'science';
}

const foodTriviaDatabase: FoodTrivia[] = [
  // Funny trivia
  {
    fact: "Honey never spoils! They found 2000-year-old honey in Egyptian tombs and it was still edible! My belly is jealous of honey's immortality! 🍯",
    emoji: "🍯",
    category: 'funny'
  },
  {
    fact: "Bananas are berries, but strawberries aren't! Nature's having a laugh! My belly can't handle this confusion! 🤯",
    emoji: "🍌",
    category: 'funny'
  },
  {
    fact: "A group of bananas is called a 'hand'! Give me five... bananas! My belly loves banana high-fives! ✋",
    emoji: "🍌",
    category: 'funny'
  },
  {
    fact: "Chocolate was once used as currency! Imagine paying your rent in chocolate bars! My belly would be BROKE! 💰",
    emoji: "🍫",
    category: 'funny'
  },
  {
    fact: "Peanuts aren't nuts - they're legumes! They're basically fancy peas trying to be cool! My belly respects the hustle! 🥜",
    emoji: "🥜",
    category: 'funny'
  },

  // Healthy trivia
  {
    fact: "Blueberries have more antioxidants than any other fruit! They're basically tiny superhero pills! My belly feels powerful! 💪",
    emoji: "🫐",
    category: 'healthy'
  },
  {
    fact: "Eating carrots really can improve your eyesight! Beta-carotene converts to vitamin A! My belly has X-ray vision now! 👁️",
    emoji: "🥕",
    category: 'healthy'
  },
  {
    fact: "Spinach has more protein per calorie than meat! Popeye knew what he was doing! My belly feels STRONG! 💪",
    emoji: "🥬",
    category: 'healthy'
  },
  {
    fact: "Dark chocolate can improve brain function! Smart eating = smart belly! My belly is getting a PhD! 🧠",
    emoji: "🍫",
    category: 'healthy'
  },
  {
    fact: "Green tea speeds up metabolism! My belly is basically a race car now! VROOM VROOM! 🏎️",
    emoji: "🍵",
    category: 'healthy'
  },

  // Surprising trivia
  {
    fact: "Tomatoes have more genes than humans! 31,000 vs our 20,000! My belly bows to tomato supremacy! 🍅",
    emoji: "🍅",
    category: 'surprising'
  },
  {
    fact: "Octopuses have three hearts and blue blood! Meanwhile, my belly just has one heart... for food! 💙",
    emoji: "🐙",
    category: 'surprising'
  },
  {
    fact: "Cashews grow on the bottom of cashew apples! Nature is weird! My belly is mind-blown! 🤯",
    emoji: "🥜",
    category: 'surprising'
  },
  {
    fact: "Vanilla is the second most expensive spice after saffron! My belly feels fancy with every vanilla taste! ✨",
    emoji: "🍦",
    category: 'surprising'
  },
  {
    fact: "Watermelons are 92% water! They're basically drinking food! My belly is hydrated AND fed! 💧",
    emoji: "🍉",
    category: 'surprising'
  },

  // Historical trivia
  {
    fact: "Ancient Romans ate dormice as a delicacy! Thank goodness my belly lives in modern times! 🐭",
    emoji: "🏛️",
    category: 'historical'
  },
  {
    fact: "Pizza was originally a peasant food in Naples! Now it rules the world! My belly supports this takeover! 👑",
    emoji: "🍕",
    category: 'historical'
  },
  {
    fact: "Ice cream sundaes were invented to get around Sunday laws prohibiting soda sales! Clever! My belly admires the creativity! 🍨",
    emoji: "🍨",
    category: 'historical'
  },
  {
    fact: "Ketchup was sold as medicine in the 1830s! My belly feels very healthy after french fries now! 💊",
    emoji: "🍅",
    category: 'historical'
  },

  // Science trivia
  {
    fact: "Your taste buds replace themselves every 1-2 weeks! My belly gets a flavor upgrade constantly! 👅",
    emoji: "👅",
    category: 'science'
  },
  {
    fact: "Spicy food triggers endorphins - natural painkillers! My belly is basically a pharmacy! 🌶️",
    emoji: "🌶️",
    category: 'science'
  },
  {
    fact: "Smell accounts for 80% of taste! My belly appreciates a good sniff before eating! 👃",
    emoji: "👃",
    category: 'science'
  },
  {
    fact: "Capsaicin in peppers tricks your brain into thinking your mouth is on fire! My belly loves being deceived! 🔥",
    emoji: "🌶️",
    category: 'science'
  }
];

export const getRandomFoodTrivia = (): string => {
  const trivia = foodTriviaDatabase[Math.floor(Math.random() * foodTriviaDatabase.length)];
  return `🧠 FOOD FACT: ${trivia.fact}`;
};

export const getFoodSpecificTrivia = (food: string): string | null => {
  const foodKeywords: Record<string, string[]> = {
    honey: ["honey"],
    banana: ["banana"],
    chocolate: ["chocolate"],
    carrot: ["carrot"],
    spinach: ["spinach"],
    tomato: ["tomato"],
    cashew: ["cashew"],
    vanilla: ["vanilla"],
    watermelon: ["watermelon"],
    pizza: ["pizza"],
    pepper: ["pepper", "spicy"],
    blueberry: ["blueberry"],
    ketchup: ["ketchup", "tomato"]
  };

  for (const [key, keywords] of Object.entries(foodKeywords)) {
    if (keywords.some(keyword => food.toLowerCase().includes(keyword))) {
      const relevantTrivia = foodTriviaDatabase.filter(trivia => 
        trivia.fact.toLowerCase().includes(key) || 
        keywords.some(keyword => trivia.fact.toLowerCase().includes(keyword))
      );
      
      if (relevantTrivia.length > 0) {
        const trivia = relevantTrivia[Math.floor(Math.random() * relevantTrivia.length)];
        return `🧠 FOOD FACT: ${trivia.fact}`;
      }
    }
  }

  return null;
};

// Emotional bonding messages based on user behavior patterns
export const generateEmotionalBondMessage = (
  totalMealsEaten: number, 
  daysLogged: number, 
  petName: string,
  consecutiveDays: number = 1
): string => {
  const behaviorMessages = {
    newUser: [
      `${petName.toUpperCase()} here! I'm so excited to be your gut buddy! My belly is doing happy flips! 🤸‍♂️`,
      `Welcome to the belly family! I promise to make your food journey absolutely HILARIOUS! 😂`,
      `New friend detected! My belly is throwing a welcome party! *confetti sounds* 🎉`
    ],
    consistent: [
      `You've been feeding me for ${daysLogged} days! My belly keeps a gratitude journal about you! 📖💕`,
      `${consecutiveDays} days in a row! My belly is getting attached... in the best way! 🤗`,
      `I look forward to our daily food adventures! My belly does a happy dance every time! 💃`
    ],
    experienced: [
      `Wow, ${totalMealsEaten} meals together! My belly considers you family now! 👨‍👩‍👧‍👦`,
      `We've shared so many meals! My belly has trust issues with everyone else now! 😅`,
      `You know me so well! My belly thinks you might be a mind reader! 🔮`
    ],
    milestone: [
      `MILESTONE ALERT! ${totalMealsEaten} meals! My belly is throwing a parade! 🎊`,
      `${daysLogged} days of friendship! My belly is getting emotional... *sniffles* 🥺`,
      `This is getting serious! My belly wants to introduce you to its parents! 👨‍👩‍👧‍👦`
    ]
  };

  // Determine user category
  if (totalMealsEaten < 5) {
    return behaviorMessages.newUser[Math.floor(Math.random() * behaviorMessages.newUser.length)];
  } else if (totalMealsEaten % 50 === 0 || daysLogged % 7 === 0) {
    return behaviorMessages.milestone[Math.floor(Math.random() * behaviorMessages.milestone.length)];
  } else if (consecutiveDays >= 3) {
    return behaviorMessages.consistent[Math.floor(Math.random() * behaviorMessages.consistent.length)];
  } else if (totalMealsEaten > 25) {
    return behaviorMessages.experienced[Math.floor(Math.random() * behaviorMessages.experienced.length)];
  }

  return behaviorMessages.consistent[Math.floor(Math.random() * behaviorMessages.consistent.length)];
};

// Context-aware messages based on eating patterns
export const generateContextualMessage = (
  lastEatenFoods: string[], 
  petName: string,
  totalMealsEaten: number,
  timeOfDay: string
): string => {
  const patterns = analyzeEatingPattern(lastEatenFoods);
  
  if (patterns.isHealthyStreak) {
    return `🌟 HEALTHY STREAK DETECTED! My belly is glowing with pride! Keep this green goodness coming! 💚`;
  }
  
  if (patterns.isTreatDay) {
    return `🍰 Treat day vibes! My belly believes in balance... and occasional sugar rushes! Life's too short for boring food! ✨`;
  }
  
  if (patterns.isExperimental) {
    return `🧪 Food scientist detected! My belly loves your adventurous spirit! What crazy combo will you try next? 🔬`;
  }
  
  if (patterns.isRepetitive) {
    return `🔄 My belly notices you love ${lastEatenFoods[lastEatenFoods.length - 1]}! Consistency is key... but variety is the spice of life! 🌶️`;
  }

  // Default to trivia or emotional bonding
  return Math.random() < 0.5 ? getRandomFoodTrivia() : generateEmotionalBondMessage(totalMealsEaten, 1, petName);
};

// Analyze eating patterns for contextual responses
const analyzeEatingPattern = (lastEatenFoods: string[]) => {
  const healthyFoods = ['apple', 'broccoli', 'carrot', 'spinach', 'banana', 'blueberry', 'salmon', 'quinoa'];
  const treats = ['pizza', 'burger', 'cookies', 'cake', 'chocolate', 'ice cream'];
  
  const recentFoods = lastEatenFoods.slice(-5); // Last 5 foods
  
  const healthyCount = recentFoods.filter(food => 
    healthyFoods.some(healthy => food.toLowerCase().includes(healthy))
  ).length;
  
  const treatCount = recentFoods.filter(food => 
    treats.some(treat => food.toLowerCase().includes(treat))
  ).length;
  
  const uniqueFoods = new Set(recentFoods).size;
  const repetitiveThreshold = recentFoods.length - uniqueFoods > 2;
  
  return {
    isHealthyStreak: healthyCount >= 3,
    isTreatDay: treatCount >= 2,
    isExperimental: uniqueFoods === recentFoods.length && recentFoods.length >= 3,
    isRepetitive: repetitiveThreshold
  };
};

export const shouldShowTrivia = (): boolean => {
  // Show trivia 30% of the time when not showing other special messages
  return Math.random() < 0.3;
};

export const shouldShowEmotionalMessage = (totalMealsEaten: number): boolean => {
  // More emotional messages for new users and at milestones
  if (totalMealsEaten < 10) return Math.random() < 0.4;
  if (totalMealsEaten % 25 === 0) return Math.random() < 0.8; // Milestones
  return Math.random() < 0.2;
};