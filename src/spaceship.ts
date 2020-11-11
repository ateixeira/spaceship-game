import Vector from "./lib/vector";

class Spaceship {
  public position: Vector;
  public rotation: number;

  constructor(width: number, height: number) {
    this.position = new Vector(width / 2, height / 2);
    this.rotation = 0;
  }

  private drawBody(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    const initialX = width / 2;
    const initialY = height;
    ctx.beginPath();
    ctx.moveTo(initialX, initialY);
    // Half bottom line
    ctx.lineTo(initialX + width * 0.3, initialY);
    // Right curved line
    ctx.bezierCurveTo(
      initialX + width,
      initialY - height * 0.2,
      initialX + width,
      initialY - height * 0.8,
      initialX,
      0
    );
    // Left curved line
    ctx.bezierCurveTo(
      initialX - width,
      initialY - height * 0.8,
      initialX - width,
      initialY - height * 0.2,
      initialX - width * 0.3,
      initialY
    );
    // Other half bottom line
    ctx.lineTo(initialX, initialY);
    ctx.strokeStyle = "#F39C12";
    ctx.fillStyle = "#FFCF4B";
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  private drawRightFoot(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    const initialX = width / 2;
    const initialY = height;
    ctx.beginPath();
    ctx.moveTo(initialX + width * 0.85, initialY - height * 0.35);
    ctx.quadraticCurveTo(
      initialX + width * 2,
      initialY - height * 0.2,
      initialX + width * 0.75,
      initialY + height * 0.1
    );
    ctx.quadraticCurveTo(
      initialX + width * 1.4,
      initialY - height * 0.1,
      initialX + width * 0.7,
      initialY - height * 0.15
    );
    ctx.lineWidth = 1.3;
    ctx.fillStyle = "#2ECC71";
    ctx.strokeStyle = "#007C21";
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private drawLeftFoot(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    const initialX = width / 2;
    const initialY = height;
    ctx.beginPath();
    ctx.moveTo(initialX - width * 0.85, initialY - height * 0.35);
    ctx.quadraticCurveTo(
      initialX - width * 2,
      initialY - height * 0.2,
      initialX - width * 0.75,
      initialY + height * 0.1
    );
    ctx.quadraticCurveTo(
      initialX - width * 1.4,
      initialY - height * 0.1,
      initialX - width * 0.7,
      initialY - height * 0.15
    );
    ctx.lineWidth = 1.3;
    ctx.fillStyle = "#2ECC71";
    ctx.strokeStyle = "#007C21";
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private drawWindow(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    const initialX = width / 2;
    const windowRadius = width * 0.3;
    const windowYPosition = height * 0.3;
    ctx.beginPath();
    ctx.moveTo(initialX + windowRadius, windowYPosition);
    ctx.arc(initialX, windowYPosition, windowRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.fillStyle = "#1297E0";
    ctx.strokeStyle = "#0067B0";
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  public draw(
    cx: number,
    cy: number,
    width: number = 8,
    height: number = 40,
    rotation: number = 0,
    ctx: CanvasRenderingContext2D
  ) {
    const centerX = width / 2;
    const centerY = height * 0.7;

    ctx.save();
    ctx.translate(cx + centerX, cy + centerY);
    ctx.rotate(rotation * (-Math.PI / 180));
    ctx.translate(-centerX, -centerY);

    this.drawBody(ctx, width, height);
    this.drawWindow(ctx, width, height);
    this.drawRightFoot(ctx, width, height);
    this.drawLeftFoot(ctx, width, height);

    ctx.restore();
  }
}

export default Spaceship;
