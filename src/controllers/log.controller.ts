import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.log.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
