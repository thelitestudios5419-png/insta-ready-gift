import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Fetching available models...");
    // This fetches the list of models accessible by your API Key
    // Note: The SDK doesn't have a direct 'listModels' helper exposed easily in all versions, 
    // but if the API key is valid, the previous errors usually mean the KEY is fine, 
    // but the MODEL NAME is wrong.
    
    // Let's try a simple generation with the most basic model to test connection
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("Success! 'gemini-pro' is working.");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

listModels();