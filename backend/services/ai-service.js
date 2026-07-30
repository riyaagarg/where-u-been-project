import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export const generateFunFact = async (placeName) => {
    const response = await client.chatCompletion({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
            {
                role: "user",
                content: `Write a rich, descriptive travel guide paragraph (at least 120 words) about "${placeName}" for a travel app. Cover: 1) what the place is famous for, 2) 2-3 must-see attractions with a sentence of detail on each, 3) what makes it worth visiting. Use vivid, evocative language. use proper bullets and indentation and subheadings`,
            },
        ],
        max_tokens: 1000,
    });

    return response.choices[0].message.content.trim();
};

