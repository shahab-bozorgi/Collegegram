import { NoneEmptyString } from "../../data/non-empty-string";
import { MediaId } from "./field-types/media-id";
import { MIME } from "./field-types/mime";

export interface Media {
  id: MediaId;
  name: NoneEmptyString;
  mime: MIME;
  size: number;
  path: string;
  url: string;
}

export interface CreateMedia {
  name: NoneEmptyString;
  mime: MIME;
  size: number;
  path: string;
}
