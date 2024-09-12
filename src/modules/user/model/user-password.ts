import { z } from "zod";
import { Brand } from "../../../utilities/brand";
import { HttpError } from "../../../utilities/http-error";

export type Password = Brand<string, "Password">;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,50}$/;

export const isPassword = (value: string): value is Password => {
  return passwordPattern.test(value);
};

export const toPassword = (value: string): Password => {
  if (!isPassword(value)) {
    throw new HttpError(400,"رمز عبور نامعتبر است");
  }
  return value;
};

export const zodPassword = z.string().refine(isPassword);
