import { UserId } from "../../../user/model/user-user-id";
import { PostId } from "../../model/post-id";

export interface Bookmark {
  postId: PostId;
  userId: UserId;
  createdAt: Date;
}

export interface CreateBookmark {
  postId: PostId;
  userId: UserId;
}

export interface DeleteBookmark {
  postId: PostId;
  userId: UserId;
}
