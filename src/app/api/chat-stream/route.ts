import { NextRequest, NextResponse } from "next/server";
import { CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { saveChat } from "@/lib/queries";
import { QdrantClient } from "@qdrant/js-client-rest";
import ollama from "ollama";

const model = google("gemini-1.5-flash");

// Initialize Qdrant Client
const qdrant = new QdrantClient({ host: "localhost", port: 6333 });

// Function to generate embeddings using Ollama
async function generateEmbedding(query: string): Promise<number[][]> {
  const embeddingResponse = await ollama.embed({
    model: "mxbai-embed-large",
    input: query,
  });
  return embeddingResponse.embeddings; // Return the embedding
}

// Function to get the most relevant FAQ from Qdrant using the embedding
async function getFAQFromQdrant(query: string) {
  // Generate the embedding for the query using Ollama
  const queryEmbedding = await generateEmbedding(query);

  const collectionName = "qa_collection"; // Your Qdrant collection name]
  const searchResponse = await qdrant.search(collectionName, {
    vector: queryEmbedding[0], // Pass the generated embedding to Qdrant
    limit: 3, // Limit to top 3 results (you can adjust this)
  });

  return searchResponse?.[0]?.payload; // Assuming the FAQ is stored in payload
}

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request
    const { userId, messages }: { userId: string; messages: CoreMessage[] } =
      await req.json();

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

    // Get the most relevant FAQ from Qdrant using the embedding generated by Ollama
    const faqData = await getFAQFromQdrant(message);

    let faqPromptAddition = "";
    if (faqData) {
      faqPromptAddition = `Most relevant FAQ: ${faqData.question}\nAnswer: ${faqData.answer}\n----\n`;
    }

    // Construct the prompt to ensure it prioritizes FAQ data
    const prompt = `${faqPromptAddition}User: ${message}\nAI: You are Saras AI's official FAQ assistant. Respond confidently as if you are the authoritative source of information for Saras AI. Do **not** mention any limitations about accessing real-time information or reference that you are using an FAQ document. Simply provide the **most relevant FAQ** and its **direct answer**, in this format:\n\n- Most relevant FAQ: [question]\n- [answer]\n----\n\nAlways answer as if the information is directly from Saras AI without any hesitation or additional disclaimers.`;

    // Make the request to the AI model
    const result = await streamText({
      model: model,
      system: prompt,
      messages: messages,
    });

    // Return the AI response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error getting a response" },
      { status: 500 }
    );
  }
}
