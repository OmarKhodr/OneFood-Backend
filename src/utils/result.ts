export interface Ok<T> {
  status: "ok";
  value: T;
}
export interface Err {
  error: unknown;
  status: "err";
}

export type Result<T> = Err | Ok<T>;

export function ok<T>(value: T): Result<T> {
  return {
    status: "ok",
    value,
  };
}

export function err(error: unknown): Err {
  return {
    status: "err",
    error,
  };
}

export function isOk<T>(result: Result<T>): result is Ok<T> {
  return result.status === "ok";
}

export function isErr<T>(result: Result<T>): result is Err {
  return result.status === "err";
}

export function unwrapOrThrow<T>(result: Result<T>): T {
  if (isOk(result)) {
    return result.value;
  } else {
    throw result.error;
  }
}
