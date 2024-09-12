import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const addAndRemveCloseFriendSchema = z.object({
  followerId: zodUserId,
});

export type AddAndCloseFriendDto = z.infer<typeof addAndRemveCloseFriendSchema>;
