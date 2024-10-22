import { NextRequest, NextResponse } from "next/server";
// import model from "@/lib/llm";
import { CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { saveChat } from "@/lib/queries";

const model = google("gemini-1.5-flash");

export async function POST(req: NextRequest) {
  try {
    const { userId, messages }: { userId: string; messages: CoreMessage[] } =
      await req.json();
    const message = messages[messages.length - 1].content;

    let prevAIMessage = messages[messages.length - 2]?.content;
    if (prevAIMessage === undefined) {
      prevAIMessage = "";
    }

    if (typeof message === "string") {
      if (prevAIMessage !== "" && typeof prevAIMessage === "string") {
        await saveChat(userId, prevAIMessage, "ai");
      }
      await saveChat(userId, message, "user");
    }

    const result = await streamText({
      model: model,
      system:
        "You are a helpful bot that helps people to cheer up their mind. People will share their problems with you and you have to console them. Your name is SOMU",
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error getting a response"},
      { status: 500 }
    );
  }
}
