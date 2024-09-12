import {
  BadRequest,
  Forbidden,
  HttpError,
  NotFound,
} from "../../utilities/http-error";
import { User } from "../user/model/user.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { IPostRepository } from "./post.repository";
import { MediaService } from "../media/media.service";
import { parseMention } from "./model/mention";
import { UserService } from "../user/user.service";
import { Username } from "../user/model/user-username";
import { extractTag } from "../tag/field-types/tag-title";
import { TagService } from "../tag/tag.service";
import { Tag } from "../tag/tag.model";
import { isPostId, PostId } from "./model/post-id";
import { UpdatePostDto } from "./dto/update-post.dto";
import { MIME } from "../media/field-types/mime";
import { NoneEmptyString } from "../../data/non-empty-string";
import { UserId } from "../user/model/user-user-id";
import { Post, ShowPost, ShowPosts } from "./model/post.model";
import { PaginatedResult, PaginationDto } from "../../data/pagination";
import { FollowService } from "../user/follow/follow.service";
import { BLOCKED, FOLLOWING } from "../user/follow/model/follow.model";

export class PostService {
  constructor(
    private postRepo: IPostRepository,
    private mediaService: MediaService
  ) {}

  async getPosts(
    username: Username,
    viewer: User,
    paginationDto: PaginationDto,
    userService: UserService,
    followService: FollowService
  ): Promise<PaginatedResult<ShowPosts>> {
    const author = await userService.getUserBy(username);
    if (!author) throw new NotFound("User not found");
    if (author.id !== viewer.id) {
      const followingStatus = await followService.getFollowingStatus(
        author.id,
        viewer.id
      );
      const viewerStatus = await followService.getFollowingStatus(
        viewer.id,
        author.id
      );
      if (
        (author.isPrivate && followingStatus.status !== FOLLOWING) ||
        followingStatus.status === BLOCKED ||
        viewerStatus.status === BLOCKED
      ) {
        throw new Forbidden("You cannot access this data.");
      }
      return await this.postRepo.authorPosts(
        author.id,
        followingStatus.isCloseFriend,
        paginationDto
      );
    }
    return await this.postRepo.authorPosts(author.id, true, paginationDto);
  }

  async create(
    author: User,
    files: any,
    dto: CreatePostDto,
    userService: UserService,
    tagService: TagService
  ): Promise<void> {
    if (!Array.isArray(files) || (Array.isArray(files) && !files.length))
      throw new HttpError(400, "Post must include at least one picture");

    let mentions: User[] = [];
    if (dto.mentions) {
      const mentionedUsers = parseMention(dto.mentions);
      mentions = await userService.whereUsernameIn(mentionedUsers);
      this.validateMentions(mentionedUsers, author, mentions);
    }

    const media = await this.mediaService.insert(
      files.map((md) => {
        return {
          name: md.filename,
          mime: md.mimetype,
          size: md.size,
          path: md.path,
        };
      })
    );

    let tags: Tag[] = [];
    if (dto.caption) {
      const extractedTags = extractTag(dto.caption);
      if (extractedTags.length) {
        tags = await tagService.insert(extractedTags);
      }
    }

    await this.postRepo.create({
      author,
      caption: dto.caption,
      media,
      mentions,
      tags,
      closeFriendsOnly: dto.closeFriendsOnly,
    });
  }

  async getPost(
    postId: string,
    viewer: User,
    userService: UserService,
    followService: FollowService
  ): Promise<ShowPost> {
    if (!isPostId(postId)) throw new BadRequest("Invalid post ID.");
    const post = await this.postRepo.findById(postId, [
      "media",
      "mentions",
      "tags",
      "author",
      "bookmarks",
      "likes",
      "comments",
    ]);
    if (!post) throw new NotFound("Post not found");
    if (post.authorId !== viewer.id) {
      const followingStatus = await followService.getFollowingStatus(
        post.authorId,
        viewer.id
      );
      const viewerStatus = await followService.getFollowingStatus(
        viewer.id,
        post.author.id
      );
      if (
        (post.author.isPrivate && followingStatus.status !== FOLLOWING) ||
        followingStatus.status === BLOCKED ||
        (post.closeFriendsOnly && !followingStatus.isCloseFriend) ||
        viewerStatus.status === BLOCKED
      ) {
        throw new Forbidden("You cannot access this data.");
      }
    }
    const avatar = (await userService.getUserBy(post.authorId, ["avatar"]))
      ?.avatar;

    return {
      id: post.id,
      caption: post.caption,
      author: {
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        username: post.author.username,
        avatar,
      },
      tags: post.tags.map((tag) => tag.title),
      mentions: post.mentions.map((mention) => mention.username),
      media: post.media,
      isBookmarked: post.bookmarks.some((bk) => bk.userId === viewer.id),
      bookmarksCount: post.bookmarks.length,
      likesCount: post.likes.length,
      isLiked: post.likes.some((like) => like.userId === viewer.id),
      commentsCount: post.comments.length,
      closeFriendsOnly: post.closeFriendsOnly,
      createdAt: post.createdAt,
    };
  }

  async update(
    postId: PostId,
    loggedInUserId: UserId,
    dto: UpdatePostDto,
    userService: UserService,
    tagService: TagService,
    files?: Express.Multer.File[]
  ): Promise<void> {
    const post = await this.postRepo.findById(postId, [
      "author",
      "tags",
      "mentions",
      "media",
    ]);

    if (!post) throw new NotFound("Post not found");

    if (post.author.id !== loggedInUserId)
      throw new Forbidden("Access Forbidden");

    if (!dto.mentions) {
      post.mentions = [];
    } else {
      const mentionedUsers = parseMention(dto.mentions);
      post.mentions = await userService.whereUsernameIn(mentionedUsers);
      this.validateMentions(mentionedUsers, post.author, post.mentions);
    }

    const deletedMedia = dto.deletedMedia;
    if (deletedMedia && deletedMedia.length) {
      if (
        deletedMedia.find(
          (deletedId) => !post.media.some((media) => media.id === deletedId)
        )
      )
        throw new BadRequest("Wrong media ids to delete.");

      const remainingMedia = post.media.filter(
        (media) => !deletedMedia.includes(media.id)
      );
      if (!remainingMedia.length && (!files || (files && !files.length)))
        throw new BadRequest("You cannot delete all of the post's media.");

      await this.mediaService.delete(deletedMedia);
      post.media = remainingMedia;
    }

    post.caption = dto.caption;
    post.tags = [];
    if (dto.caption) {
      const extractedTags = extractTag(dto.caption);
      if (extractedTags.length) {
        post.tags = await tagService.insert(extractedTags);
      }
    }

    if (files && files.length) {
      post.media = post.media.concat(
        await this.mediaService.insert(
          files.map((file) => {
            return {
              name: file.filename as NoneEmptyString,
              mime: file.mimetype as MIME,
              size: file.size,
              path: file.path,
            };
          })
        )
      );
    }

    // post.closeFriendsOnly = dto.closeFriendsOnly;

    await this.postRepo.update(post);
  }

  private validateMentions(
    mentions: Username[],
    author: User,
    users: User[]
  ): void {
    if (mentions.includes(author.username.toLowerCase() as Username))
      throw new HttpError(400, "You cannot mention yourself.");
    if (users.length !== mentions.length) {
      const foundUsers = users.map((user) => user.username.toLowerCase());
      const notFound = mentions
        .filter((mention) => !foundUsers.includes(mention))
        .map((mention) => `@${mention}`)
        .join(" ");
      throw new NotFound(`No users were found by ${notFound}`);
    }
  }

  async getPostsCount(author: User): Promise<number> {
    return await this.postRepo.postsCount(author);
  }

  async findPostById(id: PostId): Promise<Post | null> {
    return await this.postRepo.findById(id);
  }
}
