import { z } from "zod";
import { zodUsername } from "../../user/model/user-username";
import { paginationSchema } from "../../../data/pagination";

export const getPostsSchema = z
  .object({
    username: zodUsername,
  })
  .merge(paginationSchema);
