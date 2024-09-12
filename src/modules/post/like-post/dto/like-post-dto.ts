import { z } from "zod";
import { zodPostId } from "../../model/post-id";
import { zodUserId } from "../../../user/model/user-user-id";

export const LikePostSchema = z.object({
  userId: zodUserId,
  postId: zodPostId,
});

export type LikePostDto = z.infer<typeof LikePostSchema>;
