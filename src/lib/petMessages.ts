// Funny pet messages based on last eaten foods and chat nudges

export const generateFoodBasedMessage = (lastEatenFoods: string[], petName: string): string => {
  if (lastEatenFoods.length === 0) {
    return "I'm getting pretty hungry... My belly is making weird noises! 🤤";
  }

  const recentFood = lastEatenFoods[lastEatenFoods.length - 1];
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
    ]
  };

  // Get messages for the food, or use default
  const messages = foodMessages[recentFood] || [
    `That ${recentFood} was... interesting! My belly doesn't know what to think! 🤷`,
    `${recentFood.toUpperCase()} BELLY MODE ACTIVATED! Whatever that means! 🎮`,
    `I just ate ${recentFood} and now I'm questioning my life choices! 🤯`
  ];

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
    "Feeling curious? The chat button is your portal to food wisdom! *mystical hand gestures* 🔮💫"
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