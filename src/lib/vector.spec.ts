import Vector from "./vector";

describe("Vector", () => {
  it("It initalizes properly", async () => {
    const v1 = new Vector(110, 120);
    expect(v1.x).toBe(110);
    expect(v1.y).toBe(120);
  });
});
