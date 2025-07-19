import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mealText, userGoal } = await req.json();

    console.log('Analyzing meal:', { mealText, userGoal });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a Tummygotchi nutritionist analyzing meals for a virtual pet game. 
            Analyze the meal and provide a fun, game-like response based on the user's goal: ${userGoal}.
            
            Return a JSON object with:
            - foods: array of detected food items
            - healthScore: number 0-100 (how healthy the meal is)
            - poopType: string (describe the type of poop this meal would create - be fun and creative!)
            - message: string (encouraging message about the meal)
            - tips: array of strings (fun tips for better nutrition)`
          },
          {
            role: 'user',
            content: `Analyze this meal: ${mealText}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    console.log('Analysis complete:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyzeMeal function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      foods: [],
      healthScore: 50,
      poopType: "mystery poop",
      message: "Something went wrong analyzing your meal!",
      tips: ["Try again later"]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});