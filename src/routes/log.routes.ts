import { Router } from "express";
import { getAllLogs } from "../controllers/log.controller";

const router = Router();

router.get("/", getAllLogs);

export default router;
