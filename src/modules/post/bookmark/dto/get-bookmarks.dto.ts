import { z } from "zod";
import { zodPositiveInt } from "../../../../data/int";
import { zodUserId } from "../../../user/model/user-user-id";

export const GetBookmarksSchema = z.object({
  userId: zodUserId,
  page: zodPositiveInt,
  limit: zodPositiveInt,
});

export type GetBookmarksDto = z.infer<typeof GetBookmarksSchema>;
