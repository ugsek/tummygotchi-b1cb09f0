// Funny pet messages based on last eaten foods and chat nudges
import { 
  getMealTimingComment, 
  getHungerByTime, 
  shouldShowTimeSensitiveMessage,
  getCurrentMealPeriod 
} from "./timeSensitiveMessages";
import { getTimeSinceLastMeal, getWeekdayContextMessage } from "./hungerTimingMessages";
import { 
  getRandomFoodTrivia, 
  getFoodSpecificTrivia, 
  generateEmotionalBondMessage, 
  generateContextualMessage,
  shouldShowTrivia,
  shouldShowEmotionalMessage
} from "./foodTrivia";

export const generateFoodBasedMessage = (
  lastEatenFoods: string[], 
  petName: string, 
  totalMealsEaten: number = 0,
  daysLogged: number = 1
): string => {
  // Priority 1: Check for emotional bonding moments
  if (shouldShowEmotionalMessage(totalMealsEaten)) {
    return generateEmotionalBondMessage(totalMealsEaten, daysLogged, petName);
  }

  // Priority 2: Check if we should show time-sensitive message
  if (shouldShowTimeSensitiveMessage()) {
    // Sometimes show weekday context instead of meal timing
    if (Math.random() < 0.3) {
      return getWeekdayContextMessage(petName);
    }
    return getMealTimingComment(petName);
  }

  // Priority 3: Show food trivia occasionally
  if (shouldShowTrivia() && lastEatenFoods.length > 0) {
    const recentFood = lastEatenFoods[lastEatenFoods.length - 1];
    const specificTrivia = getFoodSpecificTrivia(recentFood);
    if (specificTrivia) {
      return specificTrivia;
    }
    return getRandomFoodTrivia();
  }

  // Priority 4: Contextual analysis of eating patterns
  if (lastEatenFoods.length >= 3 && Math.random() < 0.3) {
    const currentMealPeriod = getCurrentMealPeriod();
    return generateContextualMessage(lastEatenFoods, petName, totalMealsEaten, currentMealPeriod);
  }

  // Priority 5: No food eaten yet
  if (lastEatenFoods.length === 0) {
    // Show time-appropriate hunger message or time since last meal
    if (Math.random() < 0.4) {
      return getTimeSinceLastMeal(lastEatenFoods, totalMealsEaten);
    }
    return getHungerByTime();
  }

  const recentFood = lastEatenFoods[lastEatenFoods.length - 1];
  const currentMealPeriod = getCurrentMealPeriod();
  
  // Add time context to food reactions occasionally
  const useTimeContext = Math.random() < 0.4;
  
  if (useTimeContext) {
    const timeContextMessages: Record<string, string[]> = {
      breakfast: [
        `${recentFood.toUpperCase()} for breakfast? My belly approves of this morning choice! 🌅`,
        `Starting the day with ${recentFood}! My belly is ready to conquer the world! 💪`,
        `Morning fuel-up with ${recentFood}! My belly's engine is purring! 🏎️`
      ],
      lunch: [
        `${recentFood.toUpperCase()} lunch break! My belly is taking notes for next time! 📝`,
        `Midday ${recentFood} power-up! My belly's productivity just increased! 📈`,
        `Lunch hour ${recentFood}! My belly is living its best life! ✨`
      ],
      dinner: [
        `Evening ${recentFood} feast! My belly is putting on its fancy napkin! 🍽️`,
        `Dinner time ${recentFood}! My belly is ready for the grand finale! 🎭`,
        `${recentFood.toUpperCase()} for dinner? My belly is having a five-star experience! ⭐`
      ],
      late_night: [
        `Late night ${recentFood}? My belly is impressed by your dedication! 🌙`,
        `${recentFood.toUpperCase()} at this hour? My belly salutes your boldness! 🫡`,
        `Night owl ${recentFood} session! My belly is staying up past bedtime! 🦉`
      ],
      midnight: [
        `MIDNIGHT ${recentFood.toUpperCase()}! My belly is officially nocturnal! 🦇`,
        `3 AM ${recentFood}? My belly questions your life choices... but respects them! 😅`,
        `Witching hour ${recentFood}! My belly is brewing midnight magic! 🔮`
      ]
    };
    
    const contextMessages = timeContextMessages[currentMealPeriod];
    if (contextMessages && Math.random() < 0.6) {
      return contextMessages[Math.floor(Math.random() * contextMessages.length)];
    }
  }
  
  // Priority 6: Enhanced food-specific reactions with more personality
  const foodMessages: Record<string, string[]> = {
    // Healthy foods
    apple: [
      "That apple was crunchy-munchy! My teeth are doing a happy dance! 🦷✨",
      "An apple a day keeps the doctor away... but brings the POOP closer! 🍎💩",
      "I feel so fancy after that apple! Should I wear a monocle? 🧐"
    ],
    broccoli: [
      "Those little green trees were AMAZING! I feel like a dinosaur! 🦕",
      "Broccoli makes me feel like I have superpowers! VEGGIE POWER! 💪",
      "My belly is doing the broccoli boogie! *wiggle wiggle* 🕺"
    ],
    banana: [
      "That banana made me go BANANA! Get it? I'm hilarious! 🍌😂",
      "Potassium power activated! I'm basically a superhero now! ⚡",
      "Split split hooray! My belly is doing the banana split dance! 💃"
    ],
    carrot: [
      "Crunch crunch! Now I can see in the dark! Wait... I don't have real eyes! 👀",
      "Orange you glad I ate that carrot? I LOVE BAD PUNS! 🥕😆",
      "My belly is glowing orange! Is that normal? Should I be worried? 🔶"
    ],
    
    // Treats and junk food
    pizza: [
      "Mama mia! That pizza made my belly do the pizza spin! 🍕🌪️",
      "I'm pretty sure I heard my belly say 'PIZZA PARTY!' in Italian! 🇮🇹",
      "Pizza grease makes me extra slippery! Watch me slide! *swoosh* 🛝"
    ],
    burger: [
      "BURGER BELLY ACTIVATED! I feel like I could roll down a hill! 🍔⛰️",
      "That burger was so big, I think it's still doing gymnastics in my tummy! 🤸",
      "Moo! Did I just moo? Must be the burger talking! 🐄"
    ],
    cookies: [
      "Cookie monster WHO? I'm the REAL cookie champion! 🍪👑",
      "My belly is singing the cookie song! *Cookie, cookie, yum yum yum!* 🎵",
      "I think I have cookie crumbs in my belly button... is that a thing? 🤔"
    ],
    cake: [
      "CAKE BELLY EXPLOSION! I'm basically a walking birthday party! 🎂🎉",
      "That cake made me so happy, I think my belly is smiling! 😊",
      "Sugar rush incoming! Hold onto your hats! 🎩💨"
    ],
    
    // Mixed foods
    chicken: [
      "Cluck cluck! I think I just grew feathers in my belly! 🐔",
      "Protein power! My muscles are doing a chicken dance! 💪🕺",
      "That chicken crossed the road... right into my belly! 🛣️"
    ],
    rice: [
      "Rice rice baby! My belly is doing the rice shuffle! 🍚🎵",
      "Tiny grains, BIG flavor! My tummy is having a rice party! 🎊",
      "I'm practically a rice cooker now! Steam coming out my ears! 💨"
    ],
    
    // New additions for more variety
    salmon: [
      "Swimming upstream... right into my belly! This salmon is AMAZING! 🐟",
      "Omega-3 power activated! My belly is getting smarter by the bite! 🧠",
      "Fresh catch of the day! My belly is doing the fish dance! 🐠💃"
    ],
    avocado: [
      "GUAC AND ROLL! My belly is absolutely smashing this avocado! 🥑",
      "Healthy fats for my belly! I'm basically a superfood now! ✨",
      "Millennial approved! My belly can afford a house now! 🏠😂"
    ],
    yogurt: [
      "Probiotic party in my belly! The good bacteria are having a rave! 🦠🎉",
      "Creamy dreamy! My belly is doing the yogurt wobble! 🥛",
      "Culture club! My belly is getting very sophisticated! 🎭"
    ],
    quinoa: [
      "Keen-WAH! My belly is practicing fancy pronunciation! 🗣️",
      "Complete protein power! My belly is basically a gym now! 💪",
      "Ancient grain, modern belly! I'm historically delicious! 📚"
    ]
  };

  // Get messages for the food, or use enhanced default responses
  const messages = foodMessages[recentFood] || [
    `That ${recentFood} was... interesting! My belly doesn't know what to think! 🤷`,
    `${recentFood.toUpperCase()} BELLY MODE ACTIVATED! Whatever that means! 🎮`,
    `I just ate ${recentFood} and now I'm questioning my life choices! 🤯`,
    `New food alert! My belly is taking notes for the food diary! 📝`,
    `${recentFood} detected! My belly's food radar is always improving! 📡`,
    `Experimental eating detected! My belly applauds your food courage! 👏`
  ];

  // Add occasional emotional touch to food reactions
  if (Math.random() < 0.2) {
    const emotionalAddons = [
      " You always know how to make my belly happy! 💕",
      " My belly is grateful for your food choices! 🙏",
      " This is why we make such a great team! 🤝",
      " My belly trusts your taste completely! ✨"
    ];
    return messages[Math.floor(Math.random() * messages.length)] + 
           emotionalAddons[Math.floor(Math.random() * emotionalAddons.length)];
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

export const generateChatNudgeMessage = (petName: string): string => {
  const nudgeMessages = [
    "Psst... you know you can ask me ANYTHING about food, right? I'm basically a walking food encyclopedia! 💬🧠",
    "I'm feeling chatty! Got any burning food questions? I've got answers that'll blow your mind! 🤯💭",
    "Hey! That chat button is looking pretty lonely... Why don't you give it a tap? I promise I'm hilarious! 😂💬",
    "Did you know I can answer food questions? I'm like Google, but with a belly! 🔍🍔",
    "Tap the chat if you dare! I've got SPICY food facts that'll make your brain sizzle! 🌶️🧠",
    "I'm bored just sitting here... Ask me something! Anything! I know EVERYTHING about food! 🤓📚",
    "That chat feature isn't just for show, you know! I'm basically a food genius! 🧙‍♂️✨",
    "Feeling curious? The chat button is your portal to food wisdom! *mystical hand gestures* 🔮💫",
    "My belly is BURSTING with food knowledge! Come chat and let me blow your mind! 🤯💥",
    "Food questions welcome! My belly graduated from Food University with honors! 🎓",
    "Lonely belly seeks conversation about food! Apply within! 💌",
    "I've got jokes, facts, and food wisdom! The chat button is your gateway to belly entertainment! 🎪"
  ];

  return nudgeMessages[Math.floor(Math.random() * nudgeMessages.length)];
};

export const shouldShowChatNudge = (totalMealsEaten: number): boolean => {
  // Show chat nudge randomly, but more frequently early in the game
  if (totalMealsEaten < 5) {
    return Math.random() < 0.4; // 40% chance for new users
  } else if (totalMealsEaten < 15) {
    return Math.random() < 0.25; // 25% chance for intermediate users
  } else {
    return Math.random() < 0.15; // 15% chance for experienced users
  }
};