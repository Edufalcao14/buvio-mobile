import { userInputSchema } from "./SignInValidation";

describe("SignInValidation schema", () => {
  it("accepts a valid email and password", () => {
    const result = userInputSchema.safeParse({
      email: "user@example.com",
      password: "supersecret",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = userInputSchema.safeParse({
      email: "not-an-email",
      password: "supersecret",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = userInputSchema.safeParse({
      email: "user@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});
