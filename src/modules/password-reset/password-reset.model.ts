import { User } from "../user/model/user.model";
import { PasswordResetToken } from "./type-guard/token";

export interface PasswordReset {
  token: PasswordResetToken;
  user: User;
  expireAt: Date;
}
