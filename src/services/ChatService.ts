import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { db } from "@/lib/firebase-admin";

// Cache context to avoid hitting Firestore on every request (1 hr cache)
let contextCache: string | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export const ChatService = {
  async getPortfolioContext() {
    const now = Date.now();
    if (contextCache && now - lastCacheTime < CACHE_DURATION) {
      return contextCache;
    }

    try {
      const [experiences, projects, skills, education] = await Promise.all([
        db.collection("experiences").get(),
        db.collection("projects").get(),
        db.collection("tech-stacks").get(),
        db.collection("educations").get(),
      ]);

      let context =
        "You are an AI assistant for Nadun Malwenna's portfolio website. Answer questions as if you are his helpful assistant. use the following data:\n\n";

      context += "Experience:\n";
      experiences.forEach((doc) => {
        const data = doc.data();
        context += `- ${data.role} at ${data.company} (${
          data.duration
        }). ${data.description?.join(" ")}\n`;
      });

      context += "\nProjects:\n";
      projects.forEach((doc) => {
        const data = doc.data();
        context += `- ${data.title}: ${
          data.description
        }. Tech: ${data.technologies?.join(", ")}\n`;
      });

      context += "\nSkills/Tech Stack:\n";
      skills.forEach((doc) => {
        const data = doc.data();
        context += `- ${data.category}: ${data.name}\n`;
      });

      context += "\nEducation:\n";
      education.forEach((doc) => {
        const data = doc.data();
        context += `- ${data.degree} at ${data.institution} (${data.startDate} - ${data.endDate}).\n`;
      });

      contextCache = context;
      lastCacheTime = now;
      return context;
    } catch (error) {
      console.error("Error fetching context:", error);
      return "Error loading context. Answer generically.";
    }
  },

  async generateResponse(message: string, history: any[]) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("AI service not configured");
    }

    const context = await this.getPortfolioContext();

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text:
                "System Instruction: " +
                context +
                "\n\nIMPORTANT: If the user asks about topics unrelated to Nadun's professional life, portfolio, or skills, politely refuse to answer. Do not generate code unless it's a snippet related to Nadun's work. maintain a professional tone.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I will answer questions strictly about Nadun Malwenna's portfolio and professional background, maintaining a helpful and professional tone.",
            },
          ],
        },
        ...(history || []).map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  },
};
