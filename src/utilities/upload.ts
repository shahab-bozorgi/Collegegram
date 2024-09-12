import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import e from "express";
import { PositiveInt } from "../data/int";
import { v4 } from "uuid";
import { extname } from "path";
import fs from "fs";
import { HttpError } from "./http-error";
import { MIME } from "../modules/media/field-types/mime";

const uploadPath = "./uploads";

const storage = (destination: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `${uploadPath}/${destination}`;
      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, v4() + extname(file.originalname));
    },
  });

const fileFilter =
  (allowedMIME: MIME[]) =>
  (
    req: e.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    allowedMIME.includes(file.mimetype as MIME)
      ? cb(null, true)
      : cb(new HttpError(400, "Invalid File type", {}));
  };

export const MBToBytes = (value: PositiveInt): PositiveInt =>
  (value * 1024 * 1024) as PositiveInt;

const multerConfig = (
  destination: string,
  allowedMIME: MIME[],
  maxSize: PositiveInt
) =>
  multer({
    limits: {
      fileSize: maxSize,
    },
    fileFilter: fileFilter(allowedMIME),
    storage: storage(destination),
  });

export const uploadSingleFile =
  (
    destination: string,
    fieldName: string,
    allowedMIME: MIME[],
    maxSize: PositiveInt
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const uploader = multerConfig(destination, allowedMIME, maxSize).single(
      fieldName
    );
    uploader(req, res, (err) => {
      if (err) {
        if (err instanceof MulterError)
          return next(new HttpError(400, err.message, {}));
        return next(err);
      }
      next();
    });
  };

export const uploadMultipleFiles =
  (
    destination: string,
    fieldName: string,
    allowedMIME: MIME[],
    maxSize: PositiveInt,
    maxCount?: PositiveInt
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const uploader = multerConfig(destination, allowedMIME, maxSize).array(
      fieldName,
      maxCount
    );

    uploader(req, res, (err) => {
      if (err) {
        if (err instanceof MulterError)
          return next(new HttpError(400, err.message, {}));
        return next(err);
      }
      next();
    });
  };
