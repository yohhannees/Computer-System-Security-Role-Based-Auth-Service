import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyMfa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, mfaCode } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.mfaSecret !== mfaCode) {
      return res.status(401).json({ error: "Invalid MFA code" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
