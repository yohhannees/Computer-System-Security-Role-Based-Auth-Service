import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logAction = async (action: string, userId?: number) => {
  try {
    await prisma.log.create({
      data: {
        action,
        userId: userId ?? null, // Use null if userId is undefined
      },
    });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};
