import { Request, Response, NextFunction } from "express";
import { UserService } from "../modules/user/user.service";
import jwt from "jsonwebtoken";
import { Username } from "../modules/user/model/user-username";

export const authMiddleware =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: ["No token provided"] });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: ["Invalid token format"] });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY ?? "super-secret"
      ) as { username: Username };

      const user = await userService.findByUsername(decoded.username);
      if (!user) {
        return res.status(401).json({ message: ["User not found"] });
      }

      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ message: ["Invalid or expired token"] });
    }
  };
