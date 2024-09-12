import { z } from "zod";
import { paginationSchema } from "../../../../data/pagination";
import { zodUserId } from "../../model/user-user-id";

export const GetFollowingListsSchema = z
  .object({
    followerId: zodUserId,
  })
  .merge(paginationSchema);

export type GetFollowingListsDto = z.infer<typeof GetFollowingListsSchema>;
