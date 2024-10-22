"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "./db";
import { v4 as uuidv4 } from "uuid";
import { User } from "@prisma/client";

export const getAuthUserDetails = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return userData;
};

export const initOrUpdateUserData = async (data: Partial<User>) => {
  if (!data.email) return null;
  const user = await currentUser();
  if (!user) return null;

  const userData = await db.user.upsert({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    update: { name: user.fullName },
    create: {
      id: uuidv4(),
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
    },
  });

  await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      role: "USER",
    },
  });

  return userData;
};

export const getChats = async (userId: string) => {
  const chats = await db.chat.findMany({
    where: {
      userId: userId,
    },
  });

  return chats;
};
export const saveChat = async (
  userId: string,
  message: string,
  sender: "ai" | "user"
) => {
  const chat = await db.chat.create({
    data: {
      userId: userId,
      sender: sender,
      message: message,
    },
  });

  return chat;
};
