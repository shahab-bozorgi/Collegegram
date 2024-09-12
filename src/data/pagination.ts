import { z } from "zod";
import { zodPositiveInt } from "./int";

export const paginationSchema = z.object({
  page: zodPositiveInt,
  limit: zodPositiveInt,
});

export type PaginationDto = z.infer<typeof paginationSchema>;

type PagingInfo = {
  nextPage: number | null;
  totalPages: number;
};

export type PaginatedResult<T> = T & PagingInfo;

export const paginationSkip = ({ page, limit }: PaginationDto): number => {
  return (page - 1) * limit;
};

export const paginationInfo = <T>(
  totalCount: number,
  { page, limit }: PaginationDto
): PagingInfo => {
  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  return {
    nextPage,
    totalPages,
  };
};
