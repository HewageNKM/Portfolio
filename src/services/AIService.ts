import { GoogleGenerativeAI } from "@google/generative-ai";
import { GithubService } from "./GithubService";

export class AIService {
  private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  private static model = AIService.genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  static async generateProjectContent(prompt: string, repoUrl?: string) {
    let contextPrompt = "";

    if (repoUrl) {
      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        const [_, owner, repo] = match;
        const cleanRepo = repo.replace(/\.git$/, "");
        const repoDetails = await GithubService.getRepoDetails(owner, cleanRepo);

        if (repoDetails) {
          contextPrompt = `
CONTEXT FROM GITHUB REPOSITORY:
Name: ${repoDetails.name}
Description: ${repoDetails.description || "N/A"}
Technologies: ${repoDetails.language}, ${(repoDetails.topics || []).join(", ")}
README CONTENT (EXCERPT):
${repoDetails.readme}
----------
`;
        }
      }
    }

    const finalPrompt = contextPrompt
      ? `${contextPrompt}\nUSER INSTRUCTION: ${prompt}`
      : prompt;

    const result = await this.model.generateContent(finalPrompt);
    const response = await result.response;
    return response.text();
  }
}
