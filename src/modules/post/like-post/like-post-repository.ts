import { DataSource, Repository } from "typeorm";
import { UserId } from "../../user/model/user-user-id";
import { PostId } from "../model/post-id";
import { CreateLikePost, DeleteLikePost, LikePost } from "./model/like-post-model";
import { LikePostEntity } from "./entity/like-post-entity";

export interface ILikePostRepository {
  create(likePost: CreateLikePost): Promise<LikePost>;
  delete(likepost: DeleteLikePost): Promise<boolean>;
  findLike(userId: UserId, postId: PostId): Promise<LikePost | null>;
}

export class LikePostRepository implements ILikePostRepository {
  private repo: Repository<LikePostEntity>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(LikePostEntity);
  }

  async create(likePost: CreateLikePost): Promise<LikePost> {
    return await this.repo.save({ ...likePost });
  }

  async findLike(userId: UserId, postId: PostId): Promise<LikePost | null> {
    return this.repo.findOne({ where: { userId, postId } });
  }

  async delete(likepost: DeleteLikePost): Promise<boolean> {
    return Boolean(
      (
        await this.repo.delete({
          userId: likepost.userId,
          postId: likepost.postId,
        })
      ).affected
    );
  }
}
