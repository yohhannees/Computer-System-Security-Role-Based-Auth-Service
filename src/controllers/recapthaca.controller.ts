import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { sendMfaCodeEmail, sendMfaCodeTelegram } from "../utils/helper";
import { logAction } from "../services/log.service";

const prisma = new PrismaClient();

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  );
  return response.data.success;
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, recaptchaToken } = req.body;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid reCAPTCHA" });
  }

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
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: "User already exists" });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password, recaptchaToken } = req.body;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid reCAPTCHA" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    await logAction("Admin registered", admin.id);
    res.status(201).json({ success: true, admin });
  } catch (error) {
    res.status(400).json({ success: false, message: "Admin already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, recaptchaToken } = req.body;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid reCAPTCHA" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate MFA code and send it
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendMfaCodeEmail(user.email, mfaCode); // or sendMfaCodeTelegram(chatId, mfaCode)

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
    await logAction("User logged in", user.id);
    res.json({ success: true, token, mfaRequired: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyMfa = async (req: Request, res: Response) => {
  const { email, mfaCode } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.mfaSecret !== mfaCode) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid MFA code" });
    }

    // Clear the MFA secret after successful verification
    await prisma.user.update({
      where: { email },
      data: { mfaSecret: null },
    });

    await logAction("MFA verified", user.id);
    res
      .status(200)
      .json({ success: true, message: "MFA verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
