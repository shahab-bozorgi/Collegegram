import { NotFound } from "../../../utilities/http-error";
import { UserService } from "../../user/user.service";
import { PostService } from "../post.service";
import { IBookmarkRepository } from "./bookmark.repository";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { DeleteBookmarkDto } from "./dto/delete-bookmark.dto";

export class BookmarkService {
  constructor(private bookmarkRepo: IBookmarkRepository) {}

  async createBookmark(
    dto: CreateBookmarkDto,
    userService: UserService,
    postService: PostService
  ): Promise<void> {
    if (!(await postService.findPostById(dto.postId))) {
      throw new NotFound("Post not found");
    }
    if (!(await userService.getUserBy(dto.userId))) {
      throw new NotFound("User not found");
    }

    await this.bookmarkRepo.create(dto);
  }

  async deleteBookmark(
    dto: DeleteBookmarkDto,
    userService: UserService,
    postService: PostService
  ): Promise<void> {
    if (!(await postService.findPostById(dto.postId))) {
      throw new NotFound("Post not found");
    }
    if (!(await userService.getUserBy(dto.userId))) {
      throw new NotFound("User not found");
    }

    await this.bookmarkRepo.delete(dto);
  }
}
