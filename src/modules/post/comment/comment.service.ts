import { PaginatedResult, paginationInfo } from "../../../data/pagination";
import { NotFound } from "../../../utilities/http-error";
import { UserService } from "../../user/user.service";
import { PostService } from "../post.service";
import { ICommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentsDto } from "./dto/get-comments.dto";
import { CommentId } from "./model/comment-id";
import { Comment, ShowComment } from "./model/comment.model";

export class CommentService {
  constructor(private commentRepo: ICommentRepository) {}

  async createComment(
    dto: CreateCommentDto,
    userService: UserService,
    postService: PostService
  ) {
    if ((await postService.findPostById(dto.postId)) === null) {
      throw new NotFound("Post is not found");
    }

    if ((await userService.getUserBy(dto.userId)) === null) {
      throw new NotFound("User is not found");
    }

    if (dto.parentId !== null) {
      if ((await this.commentRepo.findById(dto.parentId)) === null) {
        throw new NotFound("Parent Comment is not found");
      }
    }

    return await this.commentRepo.create({
      userId: dto.userId,
      postId: dto.postId,
      parentId: dto.parentId,
      description: dto.description,
    });
  }

  async getCommentById(commentId: CommentId) {
    return await this.commentRepo.findById(commentId);
  }

  async getComments(
    dto: GetCommentsDto,
    userService: UserService,
    postService: PostService
  ): Promise<PaginatedResult<{ comments: ShowComment[] }>> {
    if ((await postService.findPostById(dto.postId)) === null) {
      throw new NotFound("Post is not found");
    }

    const comments = await this.commentRepo.getAll(dto);

    let parentComments: ShowComment[] = [];

    if (comments !== null) {
      parentComments = comments.filter((comment) => comment.parentId === null);

      const childComments = comments.filter(
        (comment) => comment.parentId !== null
      );

      parentComments.forEach((parent) => {
        parent.replies = childComments.filter(
          (child) => child.parentId === parent.id
        );
      });

      const orphans = childComments.filter(
        (child) => !comments.some((parent) => parent.id === child.parentId)
      );

      orphans.forEach((orph) => {
        parentComments.push({
          ...orph,
          replies: [],
        });
      });
    }

    const { nextPage, totalPages } = paginationInfo(
      await this.commentRepo.countComments(dto.postId),
      {
        page: dto.page,
        limit: dto.limit,
      }
    );

    return {
      comments: parentComments,
      nextPage,
      totalPages,
    };
  }
}
