import { z } from "zod";
import { isUsername } from "../../user/model/user-username";
import { isEmail } from "../../../data/email";

export const PasswordResetLinkSchema = z.object({
  username: z
    .string({ required_error: "لطفا نام کاربری یا ایمیل خود را وارد کنید" })
    .refine((value) => isUsername(value) || isEmail(value), {
      message: "لطفا نام کاربری یا ایمیل معتبر وارد کنید",
    }),
});
