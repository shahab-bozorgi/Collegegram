import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const unblockUserSchema = z.object({
  userId: zodUserId,
});

export type UnblockUserDto = z.infer<typeof unblockUserSchema>;
