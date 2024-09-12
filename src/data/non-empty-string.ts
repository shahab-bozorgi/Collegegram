import { z } from "zod";
import { Brand } from "../utilities/brand";

export type NoneEmptyString = Brand<string, "NoneEmptyString">;

export const isNoneEmptyString = (value: string): value is NoneEmptyString => {
  return typeof value === "string" && value.length > 0;
};

export const zodNoneEmptyString = z.string().refine(isNoneEmptyString);
