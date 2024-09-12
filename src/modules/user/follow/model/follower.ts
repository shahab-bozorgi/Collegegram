import { UserId } from "../../model/user-user-id";
import { Username } from "../../model/user-username";

export interface Follower {
  id: UserId;
  avatar: string | null;
  username: Username;
  firstName: string;
  lastName: string;
  bio: string;
  followersCount: number;
}