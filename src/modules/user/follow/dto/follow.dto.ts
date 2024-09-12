import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const followSchema = z.object({
  followingId: zodUserId,
});
