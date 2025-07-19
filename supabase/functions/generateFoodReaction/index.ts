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

    // Enhanced food database with international foods
    const commonFoods = [
      // Basic foods
      'apple', 'banana', 'orange', 'beef', 'chicken', 'fish', 'rice', 'bread', 'milk', 'cheese', 'egg', 'potato', 'tomato', 'carrot', 'broccoli', 'spinach', 'pasta', 'pizza', 'burger', 'salad', 'soup', 'sandwich', 'yogurt', 'nuts', 'berries', 'avocado', 'quinoa', 'tofu', 'beans', 'lentils',
      
      // Japanese foods
      'ramen', 'sushi', 'natto', 'gyoza', 'tempura', 'udon', 'soba', 'miso', 'tofu', 'edamame', 'onigiri', 'teriyaki', 'yakitori', 'katsu', 'donburi', 'bento', 'dango', 'mochi', 'sake', 'matcha', 'wasabi', 'ginger', 'seaweed', 'nori',
      
      // Chinese foods
      'dumpling', 'wontons', 'chow mein', 'fried rice', 'dim sum', 'kung pao', 'sweet and sour', 'lo mein', 'spring roll', 'hot pot', 'congee', 'baozi', 'mantou',
      
      // Indian foods
      'curry', 'biryani', 'naan', 'chapati', 'dosa', 'samosa', 'tandoori', 'dal', 'paneer', 'masala', 'tikka', 'korma', 'vindaloo', 'lassi', 'chutney',
      
      // Mexican foods
      'tacos', 'burrito', 'quesadilla', 'enchilada', 'guacamole', 'salsa', 'tortilla', 'nachos', 'chimichanga', 'fajitas', 'tamales', 'carnitas',
      
      // Italian foods
      'spaghetti', 'ravioli', 'lasagna', 'risotto', 'gnocchi', 'focaccia', 'bruschetta', 'carbonara', 'pesto', 'marinara', 'prosciutto', 'mozzarella', 'parmesan',
      
      // Other international
      'kimchi', 'bibimbap', 'pad thai', 'pho', 'banh mi', 'falafel', 'hummus', 'tzatziki', 'paella', 'tapas', 'pierogi', 'schnitzel', 'croissant', 'baguette'
    ];

    // Function to check if food matches with misspelling tolerance
    const foodMatches = (userFood, realFood) => {
      const user = userFood.toLowerCase().trim();
      const real = realFood.toLowerCase();
      
      // Exact match
      if (user === real) return true;
      
      // Contains match
      if (user.includes(real) || real.includes(user)) return true;
      
      // Simple misspelling tolerance (Levenshtein-like)
      const getEditDistance = (a, b) => {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
          matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
          matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
              matrix[i][j] = matrix[i - 1][j - 1];
            } else {
              matrix[i][j] = Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1
              );
            }
          }
        }
        return matrix[b.length][a.length];
      };
      
      // Allow 1-2 character differences for words longer than 4 characters
      if (real.length > 4) {
        const distance = getEditDistance(user, real);
        return distance <= 2;
      } else if (real.length > 2) {
        const distance = getEditDistance(user, real);
        return distance <= 1;
      }
      
      return false;
    };

    const areActualFoods = foods.some(food => 
      commonFoods.some(realFood => 
        foodMatches(food, realFood)
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