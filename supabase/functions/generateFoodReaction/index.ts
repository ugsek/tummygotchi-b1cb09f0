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
    const { foods, userGoal, isHealthy } = await req.json();

    console.log('Generating food reaction for:', { foods, userGoal, isHealthy });

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
            content: `You are a quirky Tummygotchi pet giving funny reactions to food. Be playful, weird, and use digestive humor!
            
            Return a JSON object with:
            - reaction: a fun emoji reaction (🤤, 😋, 🤨, 😵‍💫, etc.)
            - message: a short funny comment about the food (max 50 chars)
            - bellyStatus: describe how the belly feels (max 40 chars)
            - weirdnessBoost: number 1-3 (healthy combos get 3, junk gets 1)
            
            Make it silly and digestive-focused!`
          },
          {
            role: 'user',
            content: `Foods eaten: ${foods.join(', ')}
            User goal: ${userGoal}
            Is healthy combo: ${isHealthy}
            
            Give a funny belly reaction to these foods!`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const reactionData = JSON.parse(data.choices[0].message.content);

    console.log('Generated reaction:', reactionData);

    return new Response(JSON.stringify(reactionData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateFoodReaction function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      reaction: "🤤",
      message: "BELLY LIKES THIS WEIRD COMBO!",
      bellyStatus: "Gurgling with excitement!",
      weirdnessBoost: 2
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});