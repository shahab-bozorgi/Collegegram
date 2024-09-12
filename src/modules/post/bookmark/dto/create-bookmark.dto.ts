import { z } from "zod";
import { zodUserId } from "../../../user/model/user-user-id";
import { zodPostId } from "../../model/post-id";

export const CreateBookmarkSchema = z.object({
  postId: zodPostId,
  userId: zodUserId,
});

export type CreateBookmarkDto = z.infer<typeof CreateBookmarkSchema>;
