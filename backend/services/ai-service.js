import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export const generateFunFact = async (placeName) => {
  const response = await client.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "user",
        content: `Give one short, evocative fun fact (max 20 words) about "${placeName}" for a travel app. No preamble, just the fact.`,
      },
    ],
    max_tokens: 60,
  });

  return response.choices[0].message.content.trim();
};