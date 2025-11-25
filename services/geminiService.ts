import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TimelineData } from "../types";

// Define the response schema for strict JSON output
const philosopherSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.INTEGER },
    name: { type: Type.STRING },
    years: { type: Type.STRING, description: "Lifespan or active period, e.g., '384–322 BC'" },
    schoolOfThought: { type: Type.STRING, description: "e.g., Natural Law, Legal Positivism" },
    shortSummary: { type: Type.STRING, description: "A brief 1-sentence overview." },
    detailedTheory: { type: Type.STRING, description: "A comprehensive paragraph (approx 100 words) explaining their legal philosophy." },
    majorWorks: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    keyQuotes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "1 or 2 famous quotes related to law."
    }
  },
  required: ["id", "name", "years", "schoolOfThought", "shortSummary", "detailedTheory", "majorWorks", "keyQuotes"]
};

const timelineSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    philosophers: {
      type: Type.ARRAY,
      items: philosopherSchema
    }
  },
  required: ["philosophers"]
};

export const fetchTimelineData = async (): Promise<TimelineData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a chronological timeline of the history of Legal Philosophy (Jurisprudence). Include 12 major figures from ancient times (like Plato/Aristotle) through the Middle Ages (Aquinas) to Modernity (Hobbes, Locke, Kant) and contemporary times (Hart, Dworkin, Fuller). Ensure a diverse representation of schools like Natural Law, Positivism, Realism, and Interpretivism. The output must be strictly in Chinese (Simplified) for the content, but keys in English.",
      config: {
        responseMimeType: "application/json",
        responseSchema: timelineSchema,
        systemInstruction: "You are an expert Professor of Jurisprudence. Provide accurate, academic, yet accessible summaries of legal theories."
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text) as TimelineData;
  } catch (error) {
    console.error("Failed to fetch timeline data:", error);
    throw error;
  }
};