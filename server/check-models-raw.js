import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listAvailableModels() {
  if (!API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is missing in .env file");
    return;
  }

  console.log("🔍 Checking available models for your API Key...");
  
  // We use the direct API URL to list models
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API Error:", JSON.stringify(data.error, null, 2));
      console.log("\nPossible Fixes:");
      console.log("1. Check if the API Key is correct in .env");
      console.log("2. Ensure you created the key in Google AI Studio (aistudio.google.com), not Vertex AI.");
    } else {
      const models = data.models || [];
      const chatModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      
      if (chatModels.length === 0) {
        console.log("⚠️ No chat models found for this key.");
      } else {
        console.log("✅ SUCCESS! Your key has access to these models:");
        chatModels.forEach((m) => {
          // We only care about the part after "models/"
          console.log(`   "${m.name.replace('models/', '')}"`);
        });
        
        console.log("\n👉 ACTION: Copy one of the names above (like 'gemini-1.5-flash-001') and paste it into your index.js file.");
      }
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
  }
}

listAvailableModels();