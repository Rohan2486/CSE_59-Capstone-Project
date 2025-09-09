import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

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

    res.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to generate response'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
