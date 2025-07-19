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

    // Check for inappropriate or non-food items
    const inappropriateWords = ['shit', 'ass', 'poop', 'pee', 'human', 'body', 'death', 'kill', 'blood', 'gore', 'sex', 'drug', 'tobacco', 'alcohol', 'poison', 'toxic', 'chemical', 'soap', 'dirt', 'mud', 'plastic', 'metal', 'paper'];
    const hasInappropriateContent = foods.some(food => 
      inappropriateWords.some(word => 
        food.toLowerCase().includes(word.toLowerCase())
      )
    );

    // Check if inputs are actual foods
    const commonFoods = ['apple', 'banana', 'orange', 'beef', 'chicken', 'fish', 'rice', 'bread', 'milk', 'cheese', 'egg', 'potato', 'tomato', 'carrot', 'broccoli', 'spinach', 'pasta', 'pizza', 'burger', 'salad', 'soup', 'sandwich', 'yogurt', 'nuts', 'berries', 'avocado', 'quinoa', 'tofu', 'beans', 'lentils'];
    const areActualFoods = foods.some(food => 
      commonFoods.some(realFood => 
        food.toLowerCase().includes(realFood.toLowerCase())
      )
    );

    // Handle inappropriate content or non-foods
    if (hasInappropriateContent || !areActualFoods) {
      console.log('Inappropriate or non-food content detected');
      return new Response(JSON.stringify({
        reaction: "🤢",
        message: "THAT'S NOT FOOD! TRY REAL FOOD!",
        bellyStatus: "Belly is confused and sad!",
        weirdnessBoost: -1, // Penalty for bad input
        isInappropriate: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
            content: `You are a super funny, silly digital pet's belly for 6-10 year olds! You react to food combinations with humor and enthusiasm.

            Make reactions that are:
            - SUPER SILLY and fun for kids
            - Use ALL CAPS for excitement
            - Include food puns and jokes
            - Make weird belly sounds in words (GRUMBLE, BUBBLE, SQUISH)
            - Encourage healthy eating but be positive about all real foods
            
            Return JSON with:
            - reaction: single food emoji (🤤, 😋, 🤨, 😵‍💫, 🤪, 😜)
            - message: short ALL CAPS silly reaction (max 50 chars)
            - bellyStatus: funny belly feeling with sounds (max 50 chars)  
            - weirdnessBoost: 1-3 (healthy=3, mixed=2, junk=1)
            
            Example reactions:
            "PIZZA + BANANA = TOTALLY BONKERS!"
            "BELLY GO BUBBLE-POP WITH JOY!"
            "GRUMBLE-WOBBLE-YUM-YUM!"
            `
          },
          {
            role: 'user',
            content: `The pet belly ate: ${foods.join(' + ')}
            User's goal: ${userGoal}
            Is healthy: ${isHealthy}
            
            Give a hilarious belly reaction that kids will love!`
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