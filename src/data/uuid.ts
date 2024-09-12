import { UUID as cryptoUUID } from "crypto";
import { validate } from "uuid";
import { Brand } from "../utilities/brand";
import { z } from "zod";

export type UUID = Brand<cryptoUUID, "UUID">;

export const isUUID = (value: string): value is UUID => validate(value);

export const zodUUID = z.string().refine(isUUID);