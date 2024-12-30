import { Request, Response, NextFunction } from "express";
import { logAction } from "../services/log.service";

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

export const logRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user ? req.user.userId : 0;
  const action = `${req.method} ${req.originalUrl}`;
  await logAction(action, userId);
  next();
};
