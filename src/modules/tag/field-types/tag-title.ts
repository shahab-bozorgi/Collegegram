import { Brand } from "../../../utilities/brand";

export type TagTitle = Brand<string, "TagTitle">;

const tagPattern = /#([\w\u0600-\u06FF]+)/g;

export const extractTag = (value: string): TagTitle[] => {
  return [...value.matchAll(tagPattern)]
    .map((match) => match[1] as TagTitle)
    .filter(
      (title, i, titles) => titles.findIndex((ttl) => ttl === title) === i
    );
};
