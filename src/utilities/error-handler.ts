import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "./http-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ ok: false, message: err.errors.map((err) => err.message) });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.code).json({
      ok: false,
      message: err.message,
      validation: err.validation,
    });
    return;
  }

  console.log(err);
  res.status(500).json({ ok: false, message: "Internal server error!" });
};
