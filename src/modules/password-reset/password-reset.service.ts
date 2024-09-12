import { User } from "../user/model/user.model";
import { IPasswordResetRepository } from "./password-reset.repository";
import * as crypto from "crypto";
import { PasswordResetToken } from "./type-guard/token";
import { PasswordReset } from "./password-reset.model";
import { HttpError } from "../../utilities/http-error";

export class PasswordResetService {
  constructor(private passwordResetRepo: IPasswordResetRepository) {}

  async createLink(user: User): Promise<string> {
    const passwordReset = await this.passwordResetRepo.create({
      token: crypto.randomBytes(32).toString("hex") as PasswordResetToken,
      user,
      expireAt: new Date(Date.now() + 60 * 10 * 1000),
    });
    return `${process.env.CLIENT_URL}/reset-password?token=${passwordReset?.token}`;
  }

  async findToken(token: PasswordResetToken): Promise<PasswordReset | null> {
    return await this.passwordResetRepo.findToken(token);
  }

  async deleteToken(token: PasswordResetToken): Promise<boolean | never> {
    if (await this.passwordResetRepo.deleteToken(token)) return true;
    throw new HttpError(500, "Something went wrong");
  }
}
