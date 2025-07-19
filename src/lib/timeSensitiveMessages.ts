// Time-sensitive messaging for realistic meal timing feedback

export const getCurrentMealPeriod = (): string => {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 21) return 'dinner';
  if (hour >= 21 && hour < 24) return 'late_night';
  return 'midnight'; // 0-5 AM
};

export const getTimeBasedMessage = (petName: string): string => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const mealPeriod = getCurrentMealPeriod();
  
  const timeMessages: Record<string, string[]> = {
    breakfast: [
      "Good morning, sunshine! Time to fuel up for the day! 🌅",
      "Rise and dine! My belly is doing morning stretches! 🤸‍♂️",
      "Breakfast is the most important meal... for my belly happiness! 🥞",
      "Wakey wakey, eggs and... wait, what are we having? 🍳",
      "Morning munchies activated! Let's start this day right! ☀️"
    ],
    lunch: [
      "Lunch o'clock! My belly just rang the lunch bell! 🔔",
      "Midday fuel-up time! My energy meter is getting low! ⚡",
      "Lunch break! Even my belly takes coffee breaks... but with food! ☕",
      "It's high noon for my hunger! Feed me, partner! 🤠",
      "Lunch is calling and my belly must go! 📞"
    ],
    dinner: [
      "Dinner time! My belly is setting the table! 🍽️",
      "Evening feast incoming! Time for the grand finale meal! 🎭",
      "Sunset dining! My belly is wearing its fancy napkin! 🌅",
      "Dinner bells are ringing in my tummy! Ding ding! 🔔",
      "End-of-day celebration meal! My belly earned this! 🎉"
    ],
    late_night: [
      "Late night snack attack! My belly is a night owl! 🦉",
      "That's some late dinner action! My belly stays up past bedtime! 😴",
      "Night munchies! My belly doesn't believe in bedtime! 🌙",
      "Eating at this hour? My belly is impressed by your dedication! 💪",
      "Late night fuel! My belly is basically a 24-hour diner! 🌃"
    ],
    midnight: [
      "MIDNIGHT MUNCHIES! My belly is a vampire... for food! 🧛‍♂️",
      "3 AM snack? My belly salutes your commitment to chaos! 🫡",
      "This is some serious night owl eating! My belly respects the grind! 🦉",
      "Witching hour dining! My belly is brewing something magical! 🔮",
      "Sleep is for the weak! My belly runs on midnight energy! ⚡"
    ]
  };

  return timeMessages[mealPeriod][Math.floor(Math.random() * timeMessages[mealPeriod].length)];
};

export const getMealTimingComment = (petName: string): string => {
  const now = new Date();
  const hour = now.getHours();
  const mealPeriod = getCurrentMealPeriod();
  
  // Specific time-based comments
  if (hour === 6 || hour === 7) {
    return "Early bird gets the... food! My belly is impressed! 🐦";
  }
  
  if (hour === 12) {
    return "Perfect lunch timing! My belly's internal clock is spot on! ⏰";
  }
  
  if (hour >= 9 && hour <= 10 && mealPeriod === 'breakfast') {
    return "Fashionably late breakfast! My belly likes to sleep in too! 😴";
  }
  
  if (hour >= 14 && hour <= 15 && mealPeriod === 'lunch') {
    return "Afternoon lunch! My belly appreciates the siesta timing! 🌮";
  }
  
  if (hour >= 18 && hour <= 19) {
    return "Prime dinner time! My belly is dressed for the occasion! 🍽️";
  }
  
  if (hour >= 21 && hour <= 22) {
    return "That's a fashionably late dinner! My belly is wearing its evening wear! 🌙";
  }
  
  if (hour >= 23 || hour <= 2) {
    return "WHOAH! Late night feast! My belly is pulling an all-nighter! 🌃";
  }
  
  if (hour >= 3 && hour <= 5) {
    return "This is some next-level night owl eating! My belly is concerned... but impressed! 🦉";
  }
  
  // Default to meal period message
  return getTimeBasedMessage(petName);
};

export const getHungerByTime = (): string => {
  const now = new Date();
  const hour = now.getHours();
  const lastMealHours = Math.floor(Math.random() * 4) + 2; // 2-6 hours since last meal simulation
  
  if (hour >= 6 && hour <= 9) {
    return "My belly is doing morning yoga! Time for breakfast fuel! 🧘‍♂️";
  }
  
  if (hour >= 11 && hour <= 13) {
    return "Lunch radar activated! My belly is scanning for nutrients! 📡";
  }
  
  if (hour >= 17 && hour <= 20) {
    return "Dinner siren going off! My belly is ready for the evening show! 🚨";
  }
  
  return "My belly's hunger meter is beeping! Feed me when you're ready! 📊";
};

export const shouldShowTimeSensitiveMessage = (): boolean => {
  // Show time-sensitive messages more frequently during typical meal times
  const hour = new Date().getHours();
  
  // Breakfast time (6-10 AM)
  if (hour >= 6 && hour <= 10) return Math.random() < 0.7;
  
  // Lunch time (11 AM - 2 PM)
  if (hour >= 11 && hour <= 14) return Math.random() < 0.8;
  
  // Dinner time (5-8 PM)
  if (hour >= 17 && hour <= 20) return Math.random() < 0.8;
  
  // Late night (9 PM - 2 AM)
  if (hour >= 21 || hour <= 2) return Math.random() < 0.9;
  
  // Other times
  return Math.random() < 0.3;
};
