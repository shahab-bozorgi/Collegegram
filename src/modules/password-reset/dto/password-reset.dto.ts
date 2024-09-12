import { z } from "zod";
import { isSpecificLengthString } from "../../../data/specific-length-string";
import { isPassword, Password } from "../../user/model/user-password";
import { isNoneEmptyString } from "../../../data/non-empty-string";
import { isPasswordResetToken } from "../type-guard/token";

export const passwordResetSchema = z
  .object({
    token: z.string().refine(isPasswordResetToken),
    password: z
      .string()
      .refine((value) => isSpecificLengthString(value, 8, 50))
      .refine(isPassword)
      .transform((value: string) => value as Password),

    confirmPassword: z
      .string()
      .refine(isNoneEmptyString)
      .transform((value: string) => value as Password),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "تکرار رمز عبور با رمز عبور مطابقت نداره!",
  });

export type PasswordResetDto = z.infer<typeof passwordResetSchema>;
