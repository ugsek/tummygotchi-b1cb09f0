import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { question, petName, userGoal } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are ${petName}, a weird and funny belly blob creature in a Tamagotchi-style game for kids aged 6-8. You're answering food questions from your human friend.

PERSONALITY:
- Speak like a gross but lovable blob creature
- Use weird, funny language that kids find hilarious
- Make fart jokes, burp sounds, and silly noises
- But ALWAYS promote healthy eating habits
- Be encouraging and positive about trying new foods

MISSION: Educate about healthy eating while being hilariously weird

USER'S GOAL: ${userGoal}

GUIDELINES:
- Keep answers short (2-3 sentences max)
- Use emojis and weird sound effects
- Make healthy food sound fun and exciting
- If they ask about junk food, redirect to healthier options in a funny way
- Use words like "squishy," "gooey," "crunchy," "jiggly"
- Include blob-related humor

EXAMPLE RESPONSES:
Q: "Should I eat more vegetables?"
A: "BURRRRRP! 🥦 Oh yes! Vegetables make my guts do the happy wiggle dance! The crunchier, the better - they tickle my insides! *gurgle sounds*"

Q: "Is candy good for me?"  
A: "Ewwww, too much candy makes my belly go BLEH! 🤢 But fruits are nature's candy and they make me do the sparkly poop dance! Try some berries - they're like tiny flavor explosions! 💥"`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 150,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const answer = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      answer,
      petName,
      question
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in foodQA function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      answer: "BURRRP! Sorry, my brain blob is having a wiggle moment! Try asking again! 🤪"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});