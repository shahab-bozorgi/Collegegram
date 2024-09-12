import { Media } from "../../../media/media.model";
import { PostId } from "../../../post/model/post-id";
import { UserId } from "../../../user/model/user-user-id";
import { Username } from "../../../user/model/user-username";

export interface Explore {
  posts: Array<{
    id: PostId;
    author: {
      id: UserId;
      firstName: string;
      lastName: string;
      username: Username;
      avatar: Media;
      followersCount: number;
    };
    media: string[];
    likesCount: number;
    isLiked: boolean;
    bookmarksCount: number;
    isBookmarked: boolean;
    commentsCount: number;
  }>;
}
