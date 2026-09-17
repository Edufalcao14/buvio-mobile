import { nicknameOf } from "./index";

describe("nicknameOf", () => {
  it("uses the nickname the squad chose", () => {
    expect(
      nicknameOf({ displayName: "Camille Dupont", nickname: "Cami" })
    ).toBe("Cami");
  });

  it("falls back to the first word of the display name", () => {
    expect(nicknameOf({ displayName: "Camille Dupont" })).toBe("Camille");
    expect(nicknameOf({ displayName: "Camille Dupont", nickname: null })).toBe(
      "Camille"
    );
  });

  it("treats a blank nickname as no nickname", () => {
    expect(nicknameOf({ displayName: "Camille Dupont", nickname: "   " })).toBe(
      "Camille"
    );
  });

  it("never crashes on a player with no name at all", () => {
    expect(nicknameOf({ displayName: null, nickname: null })).toBe("");
    expect(nicknameOf({})).toBe("");
  });
});
