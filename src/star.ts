import { randomNumber } from "./lib/helpers";
import Vector from "./lib/vector";

class Star {
  public position: Vector;
  public vertices: number;
  public size: number;

  constructor(width: number, height: number) {
    this.position = Vector.random(0, width, 0, height);
    this.size = randomNumber(1, 3, true);
    this.vertices = randomNumber(5, 11, true);
  }

  public draw(
    cx: number,
    cy: number,
    vertices: number,
    size: number,
    ctx: CanvasRenderingContext2D
  ) {
    const innerR = size;
    const outerR = size * 2;
    const theta = Math.PI / vertices;
    let rotation = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;

    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);

    [...Array(vertices)].map(() => {
      x = cx + Math.cos(rotation) * outerR;
      y = cy + Math.sin(rotation) * outerR;
      ctx.lineTo(x, y);
      rotation += theta;

      x = cx + Math.cos(rotation) * innerR;
      y = cy + Math.sin(rotation) * innerR;
      ctx.lineTo(x, y);
      rotation += theta;
    });

    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0078ff";
    ctx.stroke();
    ctx.fillStyle = "#78d8ff";
    ctx.fill();
  }
}

export default Star;
