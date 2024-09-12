import { DataSource, In, Repository } from "typeorm";
import { TagTitle } from "./field-types/tag-title";
import { Tag } from "./tag.model";
import { TagEntity } from "./tag.entity";

export interface ITagRepository {
  insert(titles: TagTitle[]): Promise<Tag[]>;
  whereTitleIn(titles: TagTitle[]): Promise<Tag[]>;
}

export class TagRepository implements ITagRepository {
  private repo: Repository<TagEntity>;
  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(TagEntity);
  }

  async insert(titles: TagTitle[]): Promise<Tag[]> {
    return await this.repo.save(
      titles.map((title) => {
        return { title };
      })
    );
  }

  async whereTitleIn(titles: TagTitle[]): Promise<Tag[]> {
    return await this.repo.findBy({ title: In(titles) });
  }
}
