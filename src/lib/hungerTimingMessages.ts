// Special hunger messages based on time since last meal

export const getTimeSinceLastMeal = (lastEatenFoods: string[], totalMealsEaten: number): string => {
  // If no meals eaten yet
  if (totalMealsEaten === 0) {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour <= 10) {
      return "Good morning! My belly is ready for its first meal of the day! 🌅";
    } else if (hour >= 11 && hour <= 14) {
      return "Lunch time and I haven't eaten yet! My belly is staging a protest! 🍽️";
    } else if (hour >= 17 && hour <= 20) {
      return "Dinner time! My belly has been waiting ALL DAY for this moment! 🌙";
    } else {
      return "My belly is echoing like an empty cave! Feed me please! 🕳️";
    }
  }
  
  // Simulate time since last meal (in a real app, you'd track actual timestamps)
  const hoursSinceLastMeal = Math.floor(Math.random() * 8) + 1; // 1-8 hours
  
  if (hoursSinceLastMeal >= 6) {
    return `It's been ${hoursSinceLastMeal} hours! My belly is writing a strongly worded letter! 📝`;
  } else if (hoursSinceLastMeal >= 4) {
    return `${hoursSinceLastMeal} hours without food... My belly is getting dramatic! 🎭`;
  } else if (hoursSinceLastMeal >= 2) {
    return `${hoursSinceLastMeal} hours since last meal! My belly is tapping its foot impatiently! 👣`;
  } else {
    return "Still digesting that last meal... My belly is content for now! 😌";
  }
};

// Special weekend vs weekday messages
export const getWeekdayContextMessage = (petName: string): string => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  // Weekend (Saturday/Sunday)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    if (hour >= 9 && hour <= 11) {
      return "Weekend brunch vibes! My belly is wearing its fancy weekend outfit! 🥂";
    } else if (hour >= 14 && hour <= 16) {
      return "Lazy weekend afternoon! My belly is in relaxation mode! 🛋️";
    } else {
      return "Weekend eating! My belly doesn't follow weekday rules! 🎉";
    }
  }
  
  // Weekday
  if (hour >= 7 && hour <= 9) {
    return "Weekday breakfast hustle! My belly is ready to tackle the day! ⚡";
  } else if (hour >= 12 && hour <= 13) {
    return "Lunch break from the grind! My belly needs its midday fuel! ⏰";
  } else if (hour >= 18 && hour <= 19) {
    return "End of workday feast! My belly earned this dinner! 💼";
  } else {
    return "Weekday warrior! My belly is keeping up with your busy schedule! 🏃‍♂️";
  }
};