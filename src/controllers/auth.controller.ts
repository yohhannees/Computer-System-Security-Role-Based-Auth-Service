import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMfaCodeEmail, sendMfaCodeTelegram } from "../utils/helper";
import { logAction } from "../services/log.service";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
    await logAction("User registered", user.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    await logAction("User registered", admin.id);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: "Admin already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate MFA code and send it
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendMfaCodeEmail(user.email, mfaCode); // or sendMfaCodeTelegram(chatId, mfaCode)
    await logAction("Tried Logging", user.id);

    // Save MFA code to user (in a real application, use a more secure method)
    await prisma.user.update({
      where: { email },
      data: { mfaSecret: mfaCode },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    await logAction("Mfa Code Send", user.id);
    res.json({ token, mfaRequired: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyMfa = async (req: Request, res: Response) => {
  const { email, mfaCode } = req.body;
  await logAction("User is Tring to Verify Mfa Code");
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.mfaSecret !== mfaCode) {
      return res.status(401).json({ error: "Invalid MFA code" });
    }

    // Clear the MFA secret after successful verification
    await prisma.user.update({
      where: { email },
      data: { mfaSecret: null },
    });
    await logAction("Mfa verified");
    res.status(200).json({ message: "MFA verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
