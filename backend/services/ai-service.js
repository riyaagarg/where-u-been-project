import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateFunFact = async (placeName) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Write a rich, descriptive travel guide paragraph (at least 120 words) about "${placeName}" for a travel app. Cover: 1) what the place is famous for, 2) 2-3 must-see attractions with a sentence of detail on each, 3) what makes it worth visiting. Use vivid, evocative language. Do not use a bullet list — write it as flowing prose.`,
      },
    ],
    max_tokens: 300,
    temperature: 0.8,
  });

  return response.choices[0].message.content.trim();
};