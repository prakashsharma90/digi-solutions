
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Verify .env.local logic (this script runs standalone so needs dotenv if not provided, but we can hardcode for test)
// OR better, we use the key directly if known, or process.env if this is run via a loader.
// I will use process.env and instruct user to run with dotenv or provide key.
// User's provided snippet:
/*
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
async function test() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent("Hello");
  console.log(result.response.text());
}
test();
*/

// My improved version with fallback key for easy running:
const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyB2Pz_vq5bb1pQE_-ytMZyOAwNE-GAu8iY";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    try {
        console.log(`Testing Gemini API with model: gemini-1.5-flash`);
        console.log(`Using Key: ${apiKey.substring(0, 10)}...`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success! Response:");
        console.log(result.response.text());
    } catch (error) {
        console.error("Test Failed:");
        console.error(error.message);
        if (error.message.includes("404")) console.log("Start Hint: Model not found. Check availability.");
        if (error.message.includes("403")) console.log("Start Hint: Quota/Billing issue.");
    }
}

test();
