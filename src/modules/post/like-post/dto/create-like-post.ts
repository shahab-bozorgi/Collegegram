import { z } from "zod";
import { zodPostId } from "../../model/post-id";
import { zodUserId } from "../../../user/model/user-user-id";

export const CreateLikePostSchema = z.object({
  userId: zodUserId,
  postId: zodPostId,
});

export type CreateLikePostDto = z.infer<typeof CreateLikePostSchema>;
