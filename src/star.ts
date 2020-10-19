import Vector from "./lib/vector";

class Star {
  public position: Vector;

  constructor(width: number, height: number) {
    this.position = Vector.random(0, width, 0, height);
  }

  public static draw(cx: number, cy: number, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export default Star;
