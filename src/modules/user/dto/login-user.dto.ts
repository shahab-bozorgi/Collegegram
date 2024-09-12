import { z } from "zod";
import { Password } from "../model/user-password";
import { Username } from "../model/user-username";
import { isNoneEmptyString } from "../../../data/non-empty-string";
import { Email, isEmail } from "../../../data/email";

export const loginUserDto = z.object({
  username: z
    .string({ required_error: "لطفا نام کاربری یا ایمیل خودت رو وارد کن!" })
    .refine(isNoneEmptyString, {
      message: "لطفا نام کاربری یا ایمیل خودت رو وارد کن!",
    })
    .transform((value: string) =>
      isEmail(value) ? (value as Email) : (value as Username)
    ),
  password: z
    .string({ required_error: "لطفا رمز عبور خودت رو وارد کن!" })
    .refine(isNoneEmptyString, {
      message: "لطفا رمز عبور خودت رو وارد کن!",
    })
    .transform((value: string) => value as Password),
});

export type LoginUserDto = z.infer<typeof loginUserDto>;
