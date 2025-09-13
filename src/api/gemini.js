import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function generateReadmeSections(repoData) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

  // Compose prompt for Gemini
  const prompt = `
Given the following repository data:
Title: ${repoData.title}
Description: ${repoData.description}
Tech Stack: ${repoData.techStack}
License: ${repoData.license}
Project Structure: ${repoData.structure.join("\n")}

Generate a professional README.md with these sections:
1. Project Title
2. Description
3. Features (infer if missing)
4. Installation Guide (infer if missing)
5. Tech Stack
6. Project Structure
7. License Information
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}