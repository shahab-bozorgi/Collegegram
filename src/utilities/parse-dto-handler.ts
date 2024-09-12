import { z } from "zod";
import { FieldError, FieldsObjectError } from "./http-error";

const translateZodMessage: FieldsObjectError = {
  "Invalid input": "invalid",
  Required: "required",
};

export const parseDtoWithSchema = (
  data: object,
  validationSchema: z.ZodSchema<any>
) => {
  try {
    return validationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.reduce((acc, err) => {
        const key = err.path.join(".");

        if (err.message in translateZodMessage) {
          acc[key] = translateZodMessage[err.message];
        } else {
          acc[key] = translateZodMessage["Invalid input"];
        }

        return acc;
      }, {} as FieldsObjectError);

      throw new FieldError(
        "Check validation key of this object!",
        errorMessages
      );
    }
  }
};
