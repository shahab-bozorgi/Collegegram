import { DataSource, Repository } from "typeorm";
import {
  CreateLikeComment,
  DeleteLikeComment,
  GetLikeComment,
  LikeComment,
} from "./model/like-comment.model";
import { LikeCommentEntity } from "./entity/like-comment.entity";
import { CommentEntity } from "../entity/comment.entity";

export interface ILikeCommentRepository {
  create(likeComment: CreateLikeComment): Promise<LikeComment>;
  getLikeComment(likeComment: GetLikeComment): Promise<LikeComment | null>;
  delete(likeComment: DeleteLikeComment): Promise<boolean>;
}

export class LikeCommentRepository implements ILikeCommentRepository {
  private repo: Repository<LikeCommentEntity>;

  constructor(private dataSource: DataSource) {
    this.repo = dataSource.getRepository(LikeCommentEntity);
  }

  async create(likeComment: CreateLikeComment): Promise<LikeComment> {
    const queryRunner = this.dataSource.createQueryRunner();
    const likeCommmentManagerRepo =
      queryRunner.manager.getRepository(LikeCommentEntity);
    const commentRepo = queryRunner.manager.getRepository(CommentEntity);

    await queryRunner.startTransaction();

    try {
      const newLikeComment = await likeCommmentManagerRepo.save({
        ...likeComment,
      });
      await commentRepo.increment(
        { id: likeComment.commentId },
        "likeCommentsCount",
        1
      );

      await queryRunner.commitTransaction();

      return newLikeComment;
    } catch (err) {
      console.error("Transaction failed:", err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getLikeComment(
    likeComment: GetLikeComment
  ): Promise<LikeComment | null> {
    return await this.repo.findOneBy({
      userId: likeComment.userId,
      commentId: likeComment.commentId,
    });
  }

  async delete(likeComment: DeleteLikeComment) {
    const queryRunner = this.dataSource.createQueryRunner();
    const likeCommmentManagerRepo =
      queryRunner.manager.getRepository(LikeCommentEntity);
    const commentRepo = queryRunner.manager.getRepository(CommentEntity);

    await queryRunner.startTransaction();

    try {
      const result = await likeCommmentManagerRepo.delete({
        userId: likeComment.userId,
        commentId: likeComment.commentId,
      });
      await commentRepo.decrement(
        { id: likeComment.commentId },
        "likeCommentsCount",
        1
      );

      await queryRunner.commitTransaction();

      return Boolean(result.affected);
    } catch (err) {
      console.error("Transaction failed:", err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
