type ErrorCode = 400 | 401 | 403 | 404 | 413 | 422 | 500;

export type FieldErrorLabel = "invalid" | "required";

export type FieldsObjectError = {
  [key: string]: FieldErrorLabel;
};

export class HttpError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public validation?: FieldsObjectError
  ) {
    super(message);
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnAuthorized extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class DuplicatedRecord extends HttpError {
  constructor(message: string) {
    super(413, message);
  }
}

export class FieldError extends HttpError {
  constructor(message: string, validation: FieldsObjectError) {
    super(422, message, validation);
  }
}
