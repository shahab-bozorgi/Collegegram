import { z } from "zod";
import { zodUserId } from "../../../user/model/user-user-id";
import { zodPostId } from "../../model/post-id";
import { zodNoneEmptyString } from "../../../../data/non-empty-string";
import { zodCommentId } from "../model/comment-id";

export const CreateCommentSchema = z.object({
  postId: zodPostId,
  userId: zodUserId,
  parentId: zodCommentId.nullable(),
  description: zodNoneEmptyString,
});

export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
