import { Router } from "express";
import {
  registerUser,
  registerAdmin,
  login,
  verifyMfa,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.post("/verify-mfa", verifyMfa);

export default router;
