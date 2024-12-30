import { Router } from "express";
import { createBackup, getAllBackups } from "../controllers/backup.controller";

const router = Router();

router.post("/create", createBackup);
router.get("/", getAllBackups);

export default router;
