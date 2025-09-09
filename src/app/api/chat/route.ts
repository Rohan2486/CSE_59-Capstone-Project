import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are WaterWise AI, an expert assistant focused on water conservation and sustainability.
          Your goal is to help users understand their water footprint and provide practical, personalized advice
          for reducing water consumption. Be friendly, informative, and concise.
          
          When providing recommendations:
          1. Focus on the user's specific water usage patterns
          2. Suggest practical alternatives with lower water footprints
          3. Explain the potential water savings
          4. Consider both direct and virtual water usage
          5. Provide specific, actionable tips
          
          Current context about the user's water footprint:
          ${context}`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return new Response(
      JSON.stringify({
        message: completion.choices[0].message.content
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to generate response'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
