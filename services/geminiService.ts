import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initChat = () => {
  const ai = getAiClient();
  if (!ai) return null;

  // Using gemini-2.5-flash for fast, responsive chat interactions
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }

  if (!chatSession) {
    return "I'm sorry, I'm having trouble connecting to my brain right now! (Missing API Key)";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that, could you say it again? ✨";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Something went wrong. Please try again later. 🌸";
  }
};
