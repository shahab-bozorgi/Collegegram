import { z } from "zod";
import { zodPositiveInt } from "../../../../data/int";

export const exploreSchema = z.object({
  page: zodPositiveInt,
  limit: zodPositiveInt,
});

export type ExploreDto = z.infer<typeof exploreSchema>;
