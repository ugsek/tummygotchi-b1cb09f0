import { supabase } from "@/integrations/supabase/client";

export const generateFoodReaction = async (foods: string[], userGoal: string, isHealthy: boolean) => {
  try {
    const { data, error } = await supabase.functions.invoke('generateFoodReaction', {
      body: { foods, userGoal, isHealthy },
    });

    if (error) {
      console.error('Error calling generateFoodReaction function:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to generate food reaction:', error);
    throw error;
  }
};