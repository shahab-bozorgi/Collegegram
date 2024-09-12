import { z } from "zod";
import { zodPostId } from "../../model/post-id";
import { zodInt, zodPositiveInt } from "../../../../data/int";
import { paginationSchema } from "../../../../data/pagination";

export const GetCommentsSchema = z
  .object({
    postId: zodPostId,
  })
  .merge(paginationSchema);

export type GetCommentsDto = z.infer<typeof GetCommentsSchema>;
