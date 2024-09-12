import { HttpError } from "../../utilities/http-error";
import { MediaId } from "./field-types/media-id";
import { CreateMedia, Media } from "./media.model";
import { IMediaRepository } from "./media.repository";
import fs from "fs";

export class MediaService {
  constructor(private mediaRepo: IMediaRepository) {}

  async create(fields: CreateMedia): Promise<Media> {
    const media = await this.mediaRepo.create(fields);
    if (media) return media;
    throw new HttpError(500, "Internal server error!");
  }

  async insert(fields: CreateMedia[]): Promise<Media[]> {
    const media = await this.mediaRepo.insert(fields);
    if (media.length) return media;
    throw new HttpError(500, "Internal server error!");
  }

  async delete(mediaId: MediaId | MediaId[]): Promise<void> {
    const media = await this.mediaRepo.whereIn(
      Array.isArray(mediaId) ? mediaId : [mediaId]
    );
    if (await this.mediaRepo.delete(mediaId)) {
      media.map((dm) => fs.rmSync(dm.path));
      return;
    }
    throw new HttpError(500, "Internal Server Error!");
  }
}
