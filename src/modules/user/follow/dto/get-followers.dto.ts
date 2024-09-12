import { z } from "zod";
import { paginationSchema } from "../../../../data/pagination";
import { zodUserId } from "../../model/user-user-id";

export const GetFollowerListsSchema = z
  .object({
    followingId: zodUserId,
  })
  .merge(paginationSchema);

export type GetFollowerListsDto = z.infer<typeof GetFollowerListsSchema>;
