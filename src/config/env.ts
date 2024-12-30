import dotenv from "dotenv";
dotenv.config();

export const Env = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
};
