import { supabase } from "@/integrations/supabase/client";

export const analyzeMeal = async (mealText: string, userGoal: string, imageData?: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('analyzeMeal', {
      body: { mealText, userGoal, imageData },
    });

    if (error) {
      console.error('Error calling analyzeMeal function:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to analyze meal:', error);
    throw error;
  }
};