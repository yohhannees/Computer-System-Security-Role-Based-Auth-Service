import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "./types";

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err?.statusCode)
    return res.status(err.statusCode).json({
      isSuccess: false,
      message: err.message,
      data: err.data,
    } satisfies ServerResponse<typeof err.data>);

  return res.status(500).json({
    isSuccess: false,
    message: err.message || "Something went wrong",
    data: err || null,
  } satisfies ServerResponse<typeof err.data>);
};

export default errorHandler;
