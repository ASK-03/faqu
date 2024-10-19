import { google, GoogleGenerativeAIProvider } from "@ai-sdk/google"; // Import the Google AI provider from Vercel's AI SDK

// Declare a module-scoped variable to manage the GoogleGenerativeAI instance
let genAIInstance: GoogleGenerativeAIProvider | undefined;

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

// Initialize the GoogleGenerativeAI instance using the API key if it's not already done
const genAI = genAIInstance || google("gemini-1.5-flash");

// Export the GoogleGenerativeAI instance as an AI provider using Vercel's AI library format
export const model = genAI;

export default model;
