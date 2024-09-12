import { Request, Response } from "express";
import { HttpError } from "./http-error";
import { errorHandler } from "./error-handler";

export const handleExpress = async <T>(res: Response, cb: () => Promise<T>) => {
  try {
    const data = await cb();
    res.status(200).json({ ok: true, data });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.code).json({
        ok: false,
        message: error.message,
        validation: error.validation,
      });
      return;
    }

    console.log(error);
    res.status(500).json({ ok: false, message: "Internal server error!" });
  }
};

export const expressHandler = async <T>(
  req: Request,
  res: Response,
  cb: () => Promise<T>
) => {
  try {
    const data = await cb();
    res.status(200).json({ ok: true, data });
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};
