import { z } from "zod";
import { zodUserId } from "../../../../user/model/user-user-id";
import { zodCommentId } from "../../model/comment-id";

export const LikeCommentSchema = z.object({
  userId: zodUserId,
  commentId: zodCommentId,
});

export type LikeCommentDto = z.infer<typeof LikeCommentSchema>;
