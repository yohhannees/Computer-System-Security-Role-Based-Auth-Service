import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Nodemailer setup with dummy credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dummyemail@gmail.com",
    pass: "dummy_password_123",
  },
});

// Telegram Bot Token from environment variable
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "example_bot_token";

// Function to send MFA code via email
export const sendMfaCodeEmail = async (
  email: string,
  code: string
): Promise<void> => {
  const mailOptions = {
    from: "dummyemail@gmail.com",
    to: email,
    subject: "Your MFA Code",
    text: `Your MFA code is ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`MFA code sent to ${email}`);
  } catch (error) {
    console.error("Error sending MFA code via email:", error);
    throw new Error("Failed to send MFA code via email");
  }
};

// Function to send MFA code via Telegram
export const sendMfaCodeTelegram = async (
  chatId: string,
  code: string
): Promise<void> => {
  const message = `Your MFA code is *${code}*`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    });
    console.log(`MFA code sent to Telegram chat ID ${chatId}`);
  } catch (error) {
    console.error("Error sending MFA code via Telegram:", error);
    throw new Error("Failed to send MFA code via Telegram");
  }
};
