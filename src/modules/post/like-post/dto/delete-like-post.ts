import { z } from "zod";
import { zodPostId } from "../../model/post-id";
import { zodUserId } from "../../../user/model/user-user-id";

export const DeleteLikePostSchema = z.object({
  userId: zodUserId,
  postId: zodPostId,
});

export type DeleteLikePostDto = z.infer<typeof DeleteLikePostSchema>;
