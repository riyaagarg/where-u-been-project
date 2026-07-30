import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateFunFact = async (placeName) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Write a travel guide entry about "${placeName}" for a travel app, formatted in markdown like this:

## ${placeName.toUpperCase()}

A short, vivid 2-3 sentence intro to what the place is famous for.

### Must-See Attractions
- **Attraction Name** — a sentence of detail on why it's worth visiting.
- **Attraction Name** — a sentence of detail on why it's worth visiting.
- **Attraction Name** — a sentence of detail on why it's worth visiting.
- **Attraction Name** — a sentence of detail on why it's worth visiting.



Use vivid, evocative language throughout. Follow this structure exactly, using proper markdown syntax (##, ###, -, **bold**).`,
      },
    ],
    max_tokens: 500,
    temperature: 0.8,
  });

  return response.choices[0].message.content.trim();
};