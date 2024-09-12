import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const followRequestSchema = z.object({
  followerId: zodUserId,
});
