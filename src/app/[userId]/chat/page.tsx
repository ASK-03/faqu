import React from "react";
import Chat from "./_components/chat";
import { getChats } from "@/lib/queries";
import { Message } from "ai";

type Props = {
  params: {
    userId: string;
  };
};

const page = async ({ params }: Props) => {
  const messages = await getChats(params.userId);
  const initialMessages: Message[] = messages.map((m) => ({
    id: m.id,
    role: m.sender === "user" ? "user" : "assistant",
    content: m.message,
  }));
  return (
    <div className="mx-[20vw]">
      <Chat userId={params.userId} initialMessages={initialMessages} />
    </div>
  );
};

export default page;
