
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Directly use the key from environment logic or hardcode for testing if env not loaded here
const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyB2Pz_vq5bb1pQE_-ytMZyOAwNE-GAu8iY";

const genAI = new GoogleGenerativeAI(apiKey);

async function list() {
    try {
        console.log("Listing available models...");
        const modelResponse = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Just to instantiate
        // The SDK doesn't have a direct 'listModels' on the instance in some versions, but let's try the user suggestion first or use the correct method.
        // Actually, listModels is likely on the GoogleGenerativeAI instance or a separate manager.
        // Wait, the user provided code: `const models = await genAI.listModels();` 
        // But `GoogleGenerativeAI` class does not have `listModels`. `GoogleAIFileManager` might, or it's a different API.
        // The standard REST API has list models.

        // Let's try a direct fetch to list models to be 100% sure what's available for this key.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log("Error listing models:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

list();
