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
    const { foods, userGoal, poopType } = await req.json();

    console.log('Generating food tip for:', { foods, userGoal, poopType });

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
            content: `You are a quirky Tummygotchi nutritionist. Based on the user's recent meal and their poop analysis, provide fun, game-like nutritional advice.
            
            Return a JSON object with:
            - tips: array of 3 tip objects, each with:
              - emoji: relevant emoji for the tip
              - title: short ALL CAPS title (max 20 chars)
              - description: brief description (max 40 chars)
            - encouragement: a fun encouraging message about unlocking rare poop types
            
            Keep it playful, weird, and focused on how food affects their virtual pet's poop evolution!`
          },
          {
            role: 'user',
            content: `User goal: ${userGoal}
            Recent foods eaten: ${foods.join(', ')}
            Last poop type: ${poopType}
            
            Generate personalized food tips to help them achieve their goal and unlock new poop types!`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const tips = JSON.parse(data.choices[0].message.content);

    console.log('Generated tips:', tips);

    return new Response(JSON.stringify(tips), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateFoodTip function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      tips: [
        { emoji: "🥦", title: "ADD MORE FIBER!", description: "Try broccoli, beans, or whole grains" },
        { emoji: "🍇", title: "LESS SUGAR!", description: "Try fruit instead of candy" },
        { emoji: "🥚", title: "MORE PROTEIN!", description: "Add eggs, tofu, or lean meat" }
      ],
      encouragement: "THESE FOODS WILL HELP YOU UNLOCK RARE POOP TYPES!"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});