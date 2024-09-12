import { TagTitle } from "./field-types/tag-title";
import { Tag } from "./tag.model";
import { ITagRepository } from "./tag.repository";

export class TagService {
  constructor(private tagRepo: ITagRepository) {}

  async insert(titles: TagTitle[]): Promise<Tag[]> {
    const existingTags = await this.tagRepo.whereTitleIn(titles);
    return existingTags.concat(
      await this.tagRepo.insert(
        titles.filter(
          (title) => !existingTags.map((tag) => tag.title).includes(title)
        )
      )
    );
  }
}
