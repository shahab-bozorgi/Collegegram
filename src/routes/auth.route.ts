import { Router } from "express";
import { loginUserDto } from "../modules/user/dto/login-user.dto";
import { handleExpress } from "../utilities/handle-express";
import { UserService } from "../modules/user/user.service";
import { SignUpSchema } from "../modules/user/dto/create-user.dto";
import { PasswordResetService } from "../modules/password-reset/password-reset.service";
import { sendMail } from "../utilities/mail";
import { PasswordResetLinkSchema } from "../modules/password-reset/dto/password-reset-link.dto";
import { passwordResetSchema } from "../modules/password-reset/dto/password-reset.dto";

export const makeAuthRouter = (
  userService: UserService,
  passwordResetService: PasswordResetService
) => {
  const app = Router();

  app.post("/sign-up", (req, res) => {
    const dto = SignUpSchema.parse(req.body);
    handleExpress(res, () => userService.create(dto));
  });

  app.post("/login", (req, res) => {
    const dto = loginUserDto.parse(req.body);
    handleExpress(res, () => userService.login(dto));
  });

  app.post("/forgot-password", async (req, res, next) => {
    try {
      const dto = PasswordResetLinkSchema.parse(req.body);
      const user = await userService.getUserBy(dto.username);
      if (user) {
        const resetLink = await passwordResetService.createLink(user);
        await sendMail(
          [user.email],
          "Reset password link",
          resetLink,
          `<a href="${resetLink}">برای تنظیم مجدد رمز عبور روی این لینک کلیک کنید.</a>`
        );
      }
      return res.status(200).json({ ok: true, data: {} });
    } catch (e) {
      next(e);
    }
  });

  app.post("/reset-password", async (req, res, next) => {
    try {
      const dto = passwordResetSchema.parse({
        ...req.body,
        token: req.query.token,
      });
      await userService.passwordReset(dto, passwordResetService);
      return res.status(200).json({ ok: true, data: {} });
    } catch (e) {
      next(e);
    }
  });

  return app;
};
