import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBackup = async (req: Request, res: Response) => {
  try {
    // Fetch data from all relevant tables
    const users = await prisma.user.findMany();
    const logs = await prisma.log.findMany();

    // Create a backup object
    const backupData = {
      users,
      logs,
    };

    // Store the backup data in the Backup table
    const backup = await prisma.backup.create({
      data: {
        data: backupData,
      },
    });

    res.status(201).json(backup);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBackups = async (req: Request, res: Response) => {
  try {
    const backups = await prisma.backup.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(backups);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
