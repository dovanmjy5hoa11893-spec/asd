
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchQuestions = async (level: number): Promise<Question[]> => {
  const difficulty = level <= 2 ? 'very easy' : 'easy';
  const prompt = `Generate 5 ${difficulty} English vocabulary multiple-choice questions for kindergarten children (ages 4-6). 
  Topics can include: Colors, Animals, Fruits, Numbers, Body Parts, or Daily Objects.
  Ensure the language is extremely simple.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING, description: "The simple English question." },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "4 answer options." 
              },
              correctIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)." },
              category: { type: Type.STRING }
            },
            required: ["id", "text", "options", "correctIndex", "category"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to fetch questions from Gemini:", error);
    return [];
  }
};
