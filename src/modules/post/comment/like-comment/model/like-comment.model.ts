import { UserId } from "../../../../user/model/user-user-id";
import { CommentId } from "../../model/comment-id";

export interface LikeComment {
  userId: UserId;
  commentId: CommentId;
  createdAt: Date;
}

export interface CreateLikeComment {
  userId: UserId;
  commentId: CommentId;
}

export interface GetLikeComment {
  userId: UserId;
  commentId: CommentId;
}

export interface DeleteLikeComment {
  userId: UserId;
  commentId: CommentId;
}
