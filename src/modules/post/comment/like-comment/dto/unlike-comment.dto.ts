import { z } from "zod";
import { zodUserId } from "../../../../user/model/user-user-id";
import { zodCommentId } from "../../model/comment-id";

export const UnLikeCommentSchema = z.object({
  userId: zodUserId,
  commentId: zodCommentId,
});

export type UnLikeCommentDto = z.infer<typeof UnLikeCommentSchema>;
