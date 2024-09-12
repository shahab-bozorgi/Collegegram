import { DataSource, In, Repository } from "typeorm";
import { CreateMedia, Media } from "./media.model";
import { MediaEntity } from "./media.entity";
import { v4 } from "uuid";
import { MediaId } from "./field-types/media-id";

export interface IMediaRepository {
  create(fields: CreateMedia): Promise<Media>;
  insert(fields: CreateMedia[]): Promise<Media[]>;
  delete(id: MediaId | MediaId[]): Promise<boolean>;
  whereIn(ids: MediaId[]): Promise<Media[]>;
}

export class MediaRepository implements IMediaRepository {
  private repo: Repository<MediaEntity>;

  constructor(datasource: DataSource) {
    this.repo = datasource.getRepository(MediaEntity);
  }

  async create(fields: CreateMedia): Promise<Media> {
    return this.repo.save({ ...fields, id: v4() });
  }

  async insert(media: CreateMedia[]): Promise<Media[]> {
    return this.repo.save(
      media.map((md) => {
        return { ...md, id: v4() };
      })
    );
  }

  async delete(id: MediaId | MediaId[]): Promise<boolean> {
    return Boolean((await this.repo.delete(id)).affected);
  }

  async whereIn(ids: MediaId[]): Promise<Media[]> {
    return await this.repo.findBy({ id: In(ids) });
  }
}
