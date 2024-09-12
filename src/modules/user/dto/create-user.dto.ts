import { z } from "zod";
import { Email, isEmail } from "../../../data/email";
import { isNoneEmptyString } from "../../../data/non-empty-string";
import { isPassword, Password } from "../model/user-password";
import { isUsername, Username } from "../model/user-username";
import { isSpecificLengthString } from "../../../data/specific-length-string";

export const SignUpSchema = z
  .object({
    username: z
      .string({ required_error: "نام کاربری برای ثبت نام لازمه!" })
      .refine(isNoneEmptyString, {
        message: "نام کاربری برای ثبت نام لازمه!",
      })
      .refine((value) => isSpecificLengthString(value, 3, 30), {
        message: "طول نام کاربری باید بین 3 تا 30 کارکتر باشه!",
      })
      .refine(isUsername, {
        message:
          "نام کاربری میتونه فقط شامل حروف انگلیسی بزرگ، کوچک و اعداد باشه!",
      })
      .transform((value: unknown) => value as Username),

    email: z
      .string({ required_error: "ایمیل برای ثبت نام لازمه!" })
      .refine(isNoneEmptyString, {
        message: "ایمیل برای ثبت نام لازمه!",
      })
      .refine((value) => isSpecificLengthString(value, 0, 255), {
        message: "طول ایمیل وارد شده نباید بیش از 255 کارکتر باشه!",
      })
      .refine(isEmail, {
        message: "فرمت ایمیل نادرست وارد شده!",
      })
      .transform((value: unknown) => value as Email),

    password: z
      .string({ required_error: "رمز عبور برای ثبت نام لازمه!" })
      .refine(isNoneEmptyString, {
        message: "رمز عبور برای ثبت نام لازمه!",
      })
      .refine((value) => isSpecificLengthString(value, 8, 50), {
        message: "طول رمز عبور باید حداقل 8 و حداکثر 50 کارکتر باشه!",
      })
      .refine(isPassword, {
        message:
          "رمز عبور باید شامل حداقل یک حرف بزرگ و کوچک انگلیسی و یک رقم باشه!",
      })
      .transform((value: unknown) => value as Password),

    confirmPassword: z
      .string({ required_error: "لطفا تکرار رمز عبور رو وارد کن!" })
      .refine(isNoneEmptyString, {
        message: "لطفا تکرار رمز عبور رو وارد کن!",
      })
      .transform((value: unknown) => value as Password),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "تکرار رمز عبور با رمز عبور مطابقت نداره!",
  });

export type SignUpDto = Omit<z.infer<typeof SignUpSchema>, "confirmPassword">;
