import { Email } from "../../../data/email";
import { UserId } from "./user-user-id";
import { Username } from "./user-username";
import { Media } from "../../media/media.model";
import { FollowingStatus } from "../follow/model/follow.model";

export interface User {
  id: UserId;
  firstName?: string;
  lastName?: string;
  avatar?: Media;
  bio?: string;
  username: Username;
  password: string;
  email: Email;
  isPrivate?: boolean;
}

export interface CreateUser {
  username: Username;
  email: Email;
  password: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  bio?: string;
  password?: string;
  email?: Email;
  isPrivate?: boolean;
  avatar?: Media;
}

export interface ResetPassword {
  userId: UserId;
  resetToken: string;
  dateTime: Date;
}

export interface BaseProfile {
  id: UserId;
  avatar?: Media;
  username: Username;
  isPrivate?: boolean;
  firstName?: string;
  lastName?: string;
  followingsCount?: number;
  followersCount?: number;
  postsCount: number;
  bio?: string;
}

export interface AuthenticatedUserProfile extends BaseProfile {
  email: Email;
}

export interface OtherUserProfile extends BaseProfile {
  followingStatus: FollowingStatus["status"];
  followedStatus: FollowingStatus["status"];
  isCloseFriend: boolean;
}
