import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateFunFact = async (placeName) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write a rich, descriptive travel guide paragraph (at least 120 words) about "${placeName}" for a travel app. Cover: 1) what the place is famous for, 2) 2-3 must-see attractions with a sentence of detail on each, 3) what makes it worth visiting. Use vivid, evocative language. Write it as flowing prose paragraphs only — no markdown, no bullet points, no headers, no asterisks.`,
        });

        const content = response?.text;

        if (!content) {
            throw new Error("Empty response from model");
        }

        return content.trim();
    } catch (error) {
        console.error(`generateFunFact failed for "${placeName}":`, error.message);
        return `${placeName} is a place full of stories waiting to be discovered — pin it and come back to explore what makes it special.`;
    }
};