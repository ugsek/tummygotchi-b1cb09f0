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
    const { mealText, userGoal, imageData } = await req.json();

    console.log('Analyzing meal:', { mealText, userGoal, hasImage: !!imageData });

    // Prepare messages based on whether we have an image or text
    let messages;
    
    if (imageData) {
      // Handle image analysis using OpenAI Vision
      messages = [
        {
          role: 'system',
          content: `You are a Tummygotchi nutritionist analyzing food photos for a virtual pet game. 
          Analyze the food in the image and provide a fun, game-like response based on the user's goal: ${userGoal}.
          
          Return a JSON object with:
          - foods: array of detected food items from the image
          - healthScore: number 0-100 (how healthy the meal looks)
          - poopType: string (describe the type of poop this meal would create - be fun and creative!)
          - message: string (encouraging message about the meal)
          - tips: array of strings (fun tips for better nutrition)
          - confidence: number 0-100 (how confident you are in the food identification)`
        },
        {
          role: 'user',
          content: [
            {
              type: "text",
              text: "Analyze the food in this image and tell me what you see!"
            },
            {
              type: "image_url",
              image_url: {
                url: imageData
              }
            }
          ]
        }
      ];
    } else {
      // Handle text analysis (existing functionality)
      messages = [
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
      ];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: imageData ? 'gpt-4o' : 'gpt-4o-mini', // Use gpt-4o for vision capabilities
        messages: messages,
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