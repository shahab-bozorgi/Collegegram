import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const blockUserSchema = z.object({
  userId: zodUserId,
});

export type BlockUserDto = z.infer<typeof blockUserSchema>;
