import { err, ok } from "#utils/result.js";
import { describe, expect, it } from "vitest";

describe("result helper", () => {
  it("should create an ok result", () => {
    const result = ok(42);
    expect(result).toEqual({ status: "ok", value: 42 });
  });

  it("should create an err result", () => {
    const errorMessage = "Something went wrong";
    const result = err(errorMessage);
    expect(result).toEqual({ status: "err", error: errorMessage });
  });

  it("should identify ok results", () => {
    const result = ok("success");
    expect(result.status).toBe("ok");
  });

  it("should identify err results", () => {
    const result = err("failure");
    expect(result.status).toBe("err");
  });
});
