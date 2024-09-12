import { Brand } from "../utilities/brand";

export type SpecificLengthString = Brand<string, "SpecificLengthString">;

export const isSpecificLengthString = (
  value: string,
  min: number,
  max: number
): value is SpecificLengthString => {
  return value.length >= min && value.length <= max;
};
