require("dotenv").config();

const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET as string;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;


module.exports = {
  port,
  dbUri,
  jwtSecret,
  EMAIL_ADDRESS,
  EMAIL_PASS,
  FRONTEND_URL
};
