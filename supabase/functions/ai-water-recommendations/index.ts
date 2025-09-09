import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authorization header
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user from JWT
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authorization.replace('Bearer ', '')
    );

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { waterFootprint, currentItems } = await req.json();

    // Get user's recent calculations for context
    const { data: recentLogs } = await supabase
      .from('user_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('action', 'calculation_saved')
      .order('created_at', { ascending: false })
      .limit(5);

    // Create prompt for AI recommendations
    const prompt = `
As a water conservation expert, analyze this user's water footprint and provide personalized recommendations.

Current Water Footprint: ${waterFootprint} liters
Current Items: ${JSON.stringify(currentItems, null, 2)}
Recent Activity: ${JSON.stringify(recentLogs || [], null, 2)}

Provide 3-5 actionable recommendations to reduce their water footprint. Focus on:
1. Specific alternatives to high-impact items
2. Behavioral changes
3. Realistic substitutions
4. Quantified impact when possible

Format as JSON with this structure:
{
  "recommendations": [
    {
      "title": "Short recommendation title",
      "description": "Detailed explanation",
      "impact": "Estimated water savings",
      "difficulty": "easy|medium|hard"
    }
  ],
  "summary": "Overall assessment and encouragement"
}
`;

    console.log('Sending request to OpenAI...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a water conservation expert providing personalized recommendations to reduce water footprint.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response:', aiResponse);

    // Parse AI response
    let recommendations;
    try {
      recommendations = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      recommendations = {
        recommendations: [
          {
            title: "Review Your High-Impact Items",
            description: "Based on your current selection, consider alternatives to the items with the highest water footprint.",
            impact: "Could reduce footprint by 20-40%",
            difficulty: "medium"
          }
        ],
        summary: "Every small change towards water conservation makes a difference!"
      };
    }

    // Log the recommendation request
    await supabase
      .from('user_logs')
      .insert({
        user_id: user.id,
        action: 'ai_recommendations_requested',
        payload: {
          water_footprint: waterFootprint,
          items_count: currentItems?.length || 0,
          recommendations_count: recommendations.recommendations?.length || 0
        }
      });

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-water-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});