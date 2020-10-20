import { randomNumber } from "./helpers";

describe("Helpers", () => {
  describe("randomNumber", () => {
    it("respects the constraints", async () => {
      expect(randomNumber(2, 10)).toBeGreaterThanOrEqual(2);
      expect(randomNumber(2, 10)).toBeLessThanOrEqual(10);
      expect(randomNumber(-5, -1)).toBeGreaterThanOrEqual(-5);
      expect(randomNumber(-5, -1)).toBeLessThanOrEqual(-1);
    });

    it("fails if order is not correct", async () => {
      expect(() => randomNumber(20, 10)).toThrowError(
        "Min should not be greather than max"
      );
    });

    it("returns integers when requested", async () => {
      expect(randomNumber(1, 10, true).toString()).toMatch(
        /^(0|-*[1-9]+[0-9]*)$/
      );
      expect(randomNumber(1, 10, false).toString()).toMatch(
        /^[-+]?[0-9]*\.?[0-9]+$/
      );
    });
  });
});
