import { z } from "zod";
import { zodMentionString } from "../model/mention";
import { zodDeletedMedia } from "../../media/field-types/media-id";
import { zodBoolean } from "../../../data/boolean";

export const UpdatePostSchema = z.object({
  caption: z.string(),
  mentions: zodMentionString,
  deletedMedia: zodDeletedMedia.nullish(),
  closeFriendsOnly: zodBoolean.optional(),
});

export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
