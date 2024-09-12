import { z } from "zod";
import { zodUserId } from "../../../user/model/user-user-id";
import { zodPostId } from "../../model/post-id";

export const DeleteBookmarkSchema = z.object({
  postId: zodPostId,
  userId: zodUserId,
});

export type DeleteBookmarkDto = z.infer<typeof DeleteBookmarkSchema>;
