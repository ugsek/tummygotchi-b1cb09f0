import { supabase } from "@/integrations/supabase/client";

export const generateFoodTip = async (foods: string[], userGoal: string, poopType: string = "unknown") => {
  try {
    const { data, error } = await supabase.functions.invoke('generateFoodTip', {
      body: { foods, userGoal, poopType },
    });

    if (error) {
      console.error('Error calling generateFoodTip function:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to generate food tip:', error);
    throw error;
  }
};