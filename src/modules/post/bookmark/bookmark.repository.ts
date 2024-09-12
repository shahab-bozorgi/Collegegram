import { DataSource, Repository } from "typeorm";
import { BookmarkEntity } from "./entity/bookmark.entity";
import {
  Bookmark,
  CreateBookmark,
  DeleteBookmark,
} from "./model/bookmark.model";

export interface IBookmarkRepository {
  create(bookmark: CreateBookmark): Promise<Bookmark>;
  delete(bookmark: DeleteBookmark): Promise<boolean>;
}

export class BookmarkRepository implements IBookmarkRepository {
  private repo: Repository<BookmarkEntity>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(BookmarkEntity);
  }

  async create(bookmark: CreateBookmark): Promise<Bookmark> {
    return await this.repo.save(bookmark);
  }

  async delete(bookmark: DeleteBookmark): Promise<boolean> {
    return Boolean((await this.repo.delete(bookmark)).affected);
  }
}
