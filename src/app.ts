import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import auth from "./routes/auth.routes";
import logRoutes from "./routes/log.routes";
import { logRequest } from "./middlewares/log.middleware";
import backupRoutes from "./routes/backup.routes";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);
app.use("/api/auth", auth);
app.use("/api/logs", logRoutes);
app.use("/api/backup", backupRoutes);

// app.use("/logs", logRoutes);
// app.use("/backups", backupRoutes);
app.get("/", (req, res) => {
  res.send("Server  Is  Running");
});

app.use(errorHandler);

export default app;
