import { distanceBetweenPoints, randomNumber } from "./helpers";
import Vector from "./vector";

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
  describe("distanceBetweenPoints", () => {
    it("calculates correctly", async () => {
      const p1 = new Vector(0, 0);
      const p2 = new Vector(0, -7);
      const p3 = new Vector(4, 8);
      const p4 = new Vector(3, 14);
      const p5 = new Vector(12, 8);
      expect(distanceBetweenPoints(p1, p2)).toBe(7);
      expect(distanceBetweenPoints(p1, p3)).toBe(8.94427190999916);
      expect(distanceBetweenPoints(p1, p4)).toBe(14.317821063276353);
      expect(distanceBetweenPoints(p1, p5)).toBe(14.422205101855956);
    });
  });
});
