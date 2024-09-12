import { DataSource, Repository } from "typeorm";
import {
  CreatePost,
  Post,
  PostRelations,
  PostSelectedRelations,
  ShowPosts,
  UpdatePost,
} from "./model/post.model";
import { PostEntity } from "./entity/post.entity";
import { v4 } from "uuid";
import { PostId } from "./model/post-id";
import { User } from "../user/model/user.model";
import { UserId } from "../user/model/user-user-id";
import {
  PaginatedResult,
  PaginationDto,
  paginationSkip as paginationSkip,
  paginationInfo,
} from "../../data/pagination";

export interface IPostRepository {
  create(fields: CreatePost): Promise<CreatePost & Post>;
  update(post: UpdatePost): Promise<UpdatePost>;
  findById<R extends Array<keyof PostRelations>>(
    id: PostId,
    relations: R
  ): Promise<(Post & PostSelectedRelations<R>) | null>;
  findById(id: PostId, relations?: undefined): Promise<Post | null>;
  authorPosts(
    authorId: UserId,
    closeFriendsOnly: boolean,
    pagination: PaginationDto
  ): Promise<PaginatedResult<ShowPosts>>;
  create(fields: CreatePost): Promise<Post | null>;
  postsCount(author: User): Promise<number>;
}

export class PostRepository implements IPostRepository {
  private repo: Repository<PostEntity>;
  constructor(datasource: DataSource) {
    this.repo = datasource.getRepository(PostEntity);
  }

  async postsCount(author: User): Promise<number> {
    return await this.repo.countBy({ authorId: author.id });
  }

  async create(fields: CreatePost): Promise<CreatePost & Post> {
    return await this.repo.save({ ...fields, id: v4() });
  }

  async update(post: UpdatePost): Promise<UpdatePost> {
    return await this.repo.save(post);
  }

  async findById<R extends Array<keyof PostRelations>>(
    id: PostId,
    relations?: R
  ): Promise<(Post & PostSelectedRelations<R>) | Post | null> {
    return await this.repo.findOne({ where: { id }, relations });
  }

  async authorPosts(
    authorId: UserId,
    closeFriendsOnly: boolean,
    pagination: PaginationDto
  ): Promise<PaginatedResult<ShowPosts>> {
    const result = await this.repo.findAndCount({
      select: { id: true, createdAt: true, closeFriendsOnly: true },
      where: [
        { authorId, closeFriendsOnly: false },
        { authorId, closeFriendsOnly },
      ],
      relations: { media: true },
      order: { createdAt: "DESC" },
      skip: paginationSkip(pagination),
      take: pagination.limit,
    });
    const { nextPage, totalPages } = paginationInfo(result[1], pagination);
    return {
      posts: result[0],
      nextPage,
      totalPages,
    };
  }
}
