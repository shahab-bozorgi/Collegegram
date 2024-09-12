import { z } from "zod";
import { Brand } from "../../../utilities/brand";
import { isUUID } from "../../../data/uuid";

export type MediaId = Brand<string, "MediaId">;

export const isMediaId = (value: string): value is MediaId => isUUID(value);

export const zodDeletedMedia = z.array(
  z.string().refine(isMediaId, { message: "Media id is invalid" })
);
