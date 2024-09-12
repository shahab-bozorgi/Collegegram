import { z } from "zod";
import { Email, isEmail } from "../../../data/email";
import { isPassword, Password } from "../model/user-password";
import { isSpecificLengthString } from "../../../data/specific-length-string";
import { zodBoolean } from "../../../data/boolean";

export const EditProfileSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z
      .string()
      .refine((value) => isSpecificLengthString(value, 0, 255), {
        message: "طول ایمیل وارد شده نباید بیش از 255 کارکتر باشه!",
      })
      .refine(isEmail, {
        message: "ایمیل نادرست وارد شده!",
      })
      .transform((value: string) => value as Email)
      .optional(),

    bio: z
      .string()
      .refine((value) => isSpecificLengthString(value, 0, 160), {
        message: "بیوگرافی باید حداکثر 160 کاراکتر باشد!",
      })
      .optional(),

    isPrivate: zodBoolean.optional(),

    password: z
      .string()
      .refine((value) => isSpecificLengthString(value, 8, 50), {
        message: "طول رمز عبور باید حداقل 8 کارکتر باشه!",
      })
      .refine(isPassword, {
        message:
          "رمز عبور باید شامل حداقل یک حرف بزرگ و کوچک انگلیسی و یک رقم باشه!",
      })
      .transform((value: string) => value as Password)
      .optional(),

    confirmPassword: z
      .string()
      .transform((value: unknown) => value as Password)
      .optional(),
  })
  .refine(
    (values) => !values.password || values.password === values.confirmPassword,
    {
      message: "تکرار رمز عبور با رمز عبور مطابقت نداره!",
    }
  );

export type EditProfileDto = z.infer<typeof EditProfileSchema>;
