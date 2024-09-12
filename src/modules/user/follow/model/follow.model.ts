import { Media } from "../../../media/media.model";
import { UserId } from "../../model/user-user-id";
import { Username } from "../../model/user-username";

export const PENDING = "Pending";
export const BLOCKED = "Blocked";
export const FOLLOWING = "Following";
export const NOT_FOLLOWING = "NotFollowing";
const FOLLOWING_STATUS = [PENDING, BLOCKED, FOLLOWING, NOT_FOLLOWING] as const;
export type FollowingStatus = {
  status: (typeof FOLLOWING_STATUS)[number];
  isCloseFriend: boolean;
};

const DB_FOLLOWING_STATUS = [PENDING, BLOCKED, FOLLOWING] as const;
export type DbFollowingStatus = (typeof DB_FOLLOWING_STATUS)[number];

export interface Follow {
  followerId: UserId;
  followingId: UserId;
  followingStatus: DbFollowingStatus;
  isCloseFriend: boolean;
}

export interface CreateFollow {
  followerId: UserId;
  followingId: UserId;
  followingStatus: DbFollowingStatus;
}

export interface DeleteFollow {
  followerId: UserId;
  followingId: UserId;
}

export interface UpdateFollow {
  followerId: UserId;
  followingId: UserId;
  followingStatus?: DbFollowingStatus;
  isCloseFriend?: boolean;
}

export interface UserInFollowList {
  id: UserId;
  firstName: string;
  lastName: string;
  username: Username;
  avatar: Media;
  followersCount: number;
}

export interface FollowingsList {
  followings: UserInFollowList[];
}

export interface FollowersList {
  followers: UserInFollowList[];
}
