import { z } from "zod";
import { Brand } from "../../../utilities/brand";

export type PasswordResetToken = Brand<string, "PasswordResetToken">;

export const isPasswordResetToken = (
  value: string
): value is PasswordResetToken => {
  const hexPattern = /^[0-9a-fA-F]{64}$/;
  return hexPattern.test(value);
};

export const zodPasswordResetToken = z.string().refine(isPasswordResetToken);
