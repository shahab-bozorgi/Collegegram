import { DataSource, In, Repository } from "typeorm";
import { UserId } from "../../user/model/user-user-id";
import { PostEntity } from "../../post/entity/post.entity";
import {
  PaginatedResult,
  PaginationDto,
  paginationInfo,
  paginationSkip,
} from "../../../data/pagination";
import { Explore } from "./model/explore-model";
import { FOLLOWING } from "../follow/model/follow.model";

export interface IExploreRepository {
  findPostsByUserIds(
    followingIds: UserId[],
    followerId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<Explore>>;
}

export class ExploreRepository
  extends Repository<PostEntity>
  implements IExploreRepository
{
  constructor(private dataSource: DataSource) {
    super(PostEntity, dataSource.manager);
  }

  async findPostsByUserIds(
    followingIds: UserId[],
    followerId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<Explore>> {
    const result = await this.createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .leftJoinAndSelect("post.media", "media")
      .leftJoinAndSelect("post.likes", "likes")
      .leftJoinAndSelect("post.bookmarks", "bookmarks")
      .leftJoinAndSelect("post.comments", "comments")
      .leftJoinAndSelect("author.avatar", "avatar")
      .leftJoinAndSelect("author.followers", "followers")
      .where("followers.followingStatus=:FOLLOWING", { FOLLOWING })
      .andWhere("post.authorId IN (:...followingIds)", {
        followingIds: followingIds.length ? followingIds : [-1],
      })
      .orderBy("post.createdAt", "DESC")
      .skip(paginationSkip(pagination))
      .take(pagination.limit)
      .getManyAndCount();

    const { nextPage, totalPages } = paginationInfo(result[1], pagination);
    return {
      posts: result[0].map((post) => ({
        id: post.id,
        author: {
          id: post.author.id,
          firstName: post.author.firstName,
          lastName: post.author.lastName,
          username: post.author.username,
          avatar: post.author.avatar,
          followersCount: post.author.followers.length,
        },
        media: post.media.map((media) => media.url),
        likesCount: post.likes.length,
        isLiked: post.likes.some((like) => like.userId === followerId),
        bookmarksCount: post.bookmarks.length,
        isBookmarked: post.bookmarks.some((bk) => bk.userId === followerId),
        commentsCount: post.comments.length,
      })),
      nextPage,
      totalPages,
    };
  }
}
