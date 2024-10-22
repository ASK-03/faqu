import { NextRequest, NextResponse } from "next/server";
import { CoreMessage } from "ai"; // Import CoreMessage from 'ai'
import ollama from 'ollama'; // Import the Ollama SDK
import { saveChat } from "@/lib/queries";
import { faqPrompt } from "../../../lib/prompt";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request
    const { userId, messages }: { userId: string; messages: CoreMessage[] } = await req.json();
    
    // Get the latest message
    const message = messages[messages.length - 1].content;

    // Check for previous AI message, if available
    let prevAIMessage = messages[messages.length - 2]?.content;
    if (prevAIMessage === undefined) {
      prevAIMessage = "";
    }

    // Save chat history to the database
    if (typeof message === "string") {
      if (prevAIMessage !== "" && typeof prevAIMessage === "string") {
        await saveChat(userId, prevAIMessage, "ai");
      }
      await saveChat(userId, message, "user");
    }

    // Construct the prompt for Ollama
    const prompt = `${faqPrompt}\nUser: ${message}\nAI: You are Saras AI's official FAQ assistant. Respond confidently as if you are the authoritative source of information for Saras AI. Do **not** mention any limitations about accessing real-time information or reference that you are using an FAQ document. Simply provide the **most relevant FAQ** and its **direct answer**, in this format:\n\n- Most relevant FAQ: [question]\n- [answer]\n----\n\nAlways answer as if the information is directly from Saras AI without any hesitation or additional disclaimers.`;

    // Make the request to the Ollama model with streaming enabled
    const response = await ollama.chat({
      model: 'llama3.1', // Specify the model name (you can choose any hosted model)
      messages: [{ role: 'user', content: prompt }],
      stream: true, // Enable streaming
    });

    // Return the streamed response
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error getting a response" },
      { status: 500 }
    );
  }
}