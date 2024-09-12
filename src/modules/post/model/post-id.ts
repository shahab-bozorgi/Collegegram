import { z } from "zod";
import { Brand } from "../../../utilities/brand";
import { isUUID } from "../../../data/uuid";
import { UUID } from "crypto";

export type PostId = Brand<UUID, "PostId">;

export const isPostId = (value: string): value is PostId => isUUID(value);

export const zodPostId = z.string().refine(isPostId);
