import { randomNumber } from "./helpers";

class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static random(minX: number, maxX: number, minY: number, maxY: number) {
    return new Vector(randomNumber(minX, maxX), randomNumber(minY, maxY));
  }
}

export default Vector;
