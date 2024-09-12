import { z } from "zod";
import { Brand } from "../../../utilities/brand";

export type Username = Brand<string, "Username">;

export const isUsername = (value: string): value is Username => {
  const usernamePattern = /^[A-Za-z0-9]{3,30}$/;
  return usernamePattern.test(value);
};

export const toUsername = (value: string): Username => {
  if (!isUsername(value)) {
    throw new Error("نام کاربری نامعتبر است");
  }
  return value as Username;
};

export const zodUsername = z.string().refine(isUsername, {
  message: "نام کاربری میتونه فقط شامل حروف انگلیسی بزرگ، کوچک و اعداد باشه!",
});
