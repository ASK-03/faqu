import { PrismaClient } from "@prisma/client";

// Use a module-scoped variable to manage the Prisma client instance
let prismaInstance: PrismaClient | undefined;

// Initialize the Prisma client, either from the module-scoped variable or a new instance
const db = prismaInstance || new PrismaClient();

// Store the Prisma client in the module-scoped variable if not in production
if (process.env.NODE_ENV !== "production") {
  prismaInstance = db;
}

export default db;
