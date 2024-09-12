import { NoneEmptyString } from "../../../../data/non-empty-string";
import { UserId } from "../../../user/model/user-user-id";
import { Username } from "../../../user/model/user-username";
import { PostId } from "../../model/post-id";
import { CommentId } from "./comment-id";

export interface Comment {
  id: CommentId;
  postId: PostId;
  userId: UserId;
  parentId: CommentId | null;
  description: NoneEmptyString;
  createdAt: Date;
  replies: Comment[];
  likeCommentsCount: number;
}

export interface CreateComment {
  postId: PostId;
  userId: UserId;
  parentId: CommentId | null;
  description: NoneEmptyString;
  createdAt: Date;
}

export interface ShowComment {
  id: CommentId;
  postId: PostId;
  user: {
    id: UserId;
    username: Username;
    firstName: string;
    lastName: string;
  };
  parentId: CommentId | null;
  description: NoneEmptyString;
  createdAt: Date;
  replies: ShowComment[];
  likeCommentsCount: number;
}
