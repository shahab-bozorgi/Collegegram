import { z } from "zod";
import { Brand } from "../utilities/brand";

export type Int = Brand<number, "Int">;

export const isInt = (value: number): value is Int => {
  return Number.isInteger(value);
};

export const zodInt = z.coerce.number().refine(isInt);

export type PositiveInt = Brand<number, "PositiveInt">;

export const isPositiveInt = (value: number): value is PositiveInt => {
  return value > 0 && isInt(value);
};

export const zodPositiveInt = z.coerce.number().refine(isPositiveInt);
