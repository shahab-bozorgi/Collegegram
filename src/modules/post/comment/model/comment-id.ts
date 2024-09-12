import { z } from "zod";
import { isUUID, UUID } from "../../../../data/uuid";
import { Brand } from "../../../../utilities/brand";

export type CommentId = Brand<UUID, "CommentId">;

export const isCommentId = (value: string): value is CommentId => isUUID(value);

export const zodCommentId = z.string().refine(isCommentId);
