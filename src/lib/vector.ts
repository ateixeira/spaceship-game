import { randomNumber } from "./helpers";

class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(vector: Vector): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  public subtract(vector: Vector): void {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  public static random(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
  ): Vector {
    return new Vector(randomNumber(minX, maxX), randomNumber(minY, maxY));
  }
}

export default Vector;
