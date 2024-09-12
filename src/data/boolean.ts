import { z } from "zod";

export const zodBoolean = z.boolean().or(
  z
    .string()
    .refine((val) => val === "true" || val === "false", {
      message: "Expected boolean",
    })
    .transform((val) => val === "true")
);
