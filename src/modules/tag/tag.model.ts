import { Post } from "../post/model/post.model";
import { TagId } from "./field-types/tag-id";
import { TagTitle } from "./field-types/tag-title";

export interface Tag {
  id: TagId;
  title: TagTitle;
  posts: Post[];
}
