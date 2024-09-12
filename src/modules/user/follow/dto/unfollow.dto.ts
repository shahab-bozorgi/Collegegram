import { z } from "zod";
import { zodUserId } from "../../model/user-user-id";

export const unfollowSchema = z.object({
  followingId: zodUserId,
});
