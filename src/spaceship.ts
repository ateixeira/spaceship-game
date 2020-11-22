import Vector from "./lib/vector";

class Spaceship {
  private position: Vector;
  private rotation: number;
  public rotationSpeed: number;
  public rotationRadians: number;

  constructor(width: number, height: number) {
    this.position = new Vector(width / 2, height / 2);
    this.rotation = 0;
    this.rotationSpeed = 2.5;
    this.rotationRadians = this.rotation / (Math.PI * 180);
  }

  get shipRotation(): number {
    return this.rotation;
  }

  get shipPosition(): Vector {
    return this.position;
  }

  set shipPosition(position: Vector) {
    this.position = position;
  }

  private drawBody(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    spaceshipCenter: { x: number; y: number }
  ) {
    const bottomCenter = {
      x: spaceshipCenter.x,
      y: spaceshipCenter.y + height * 0.3,
    };

    ctx.beginPath();
    ctx.moveTo(bottomCenter.x, bottomCenter.y);
    // Half bottom line
    ctx.lineTo(bottomCenter.x + width * 0.3, bottomCenter.y);
    // Right curved line
    ctx.bezierCurveTo(
      bottomCenter.x + width,
      bottomCenter.y - height * 0.2,
      bottomCenter.x + width,
      bottomCenter.y - height * 0.8,
      bottomCenter.x,
      bottomCenter.y - height
    );
    // Left curved line
    ctx.bezierCurveTo(
      bottomCenter.x - width,
      bottomCenter.y - height * 0.8,
      bottomCenter.x - width,
      bottomCenter.y - height * 0.2,
      bottomCenter.x - width * 0.3,
      bottomCenter.y
    );
    // Other half bottom line
    ctx.lineTo(bottomCenter.x, bottomCenter.y);
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
    height: number,
    spaceshipCenter: { x: number; y: number }
  ) {
    ctx.beginPath();
    ctx.moveTo(spaceshipCenter.x + width * 0.85, spaceshipCenter.y);
    ctx.quadraticCurveTo(
      spaceshipCenter.x + width * 2,
      spaceshipCenter.y + height * 0.2,
      spaceshipCenter.x + width * 0.75,
      spaceshipCenter.y + height * 0.45
    );
    ctx.quadraticCurveTo(
      spaceshipCenter.x + width * 1.2,
      spaceshipCenter.y + height * 0.2,
      spaceshipCenter.x + width * 0.6,
      spaceshipCenter.y + height * 0.25
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
    height: number,
    spaceshipCenter: { x: number; y: number }
  ) {
    ctx.beginPath();
    ctx.moveTo(spaceshipCenter.x - width * 0.85, spaceshipCenter.y);
    ctx.quadraticCurveTo(
      spaceshipCenter.x - width * 2,
      spaceshipCenter.y + height * 0.2,
      spaceshipCenter.x - width * 0.75,
      spaceshipCenter.y + height * 0.45
    );
    ctx.quadraticCurveTo(
      spaceshipCenter.x - width * 1.2,
      spaceshipCenter.y + height * 0.2,
      spaceshipCenter.x - width * 0.6,
      spaceshipCenter.y + height * 0.25
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
    height: number,
    spaceshipCenter: { x: number; y: number }
  ) {
    const initialX = spaceshipCenter.x;
    const windowRadius = width * 0.3;
    const windowYPosition = spaceshipCenter.y - height * 0.3;
    ctx.beginPath();
    ctx.moveTo(spaceshipCenter.x + windowRadius, windowYPosition);
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
    size: number,
    rotation: number = 0,
    ctx: CanvasRenderingContext2D
  ) {
    const width: number = size;
    const height: number = 4 * size;
    const spaceshipCenter = { x: cx, y: cy };

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationRadians);
    ctx.translate(-cx, -cy);

    this.drawBody(ctx, width, height, spaceshipCenter);
    this.drawWindow(ctx, width, height, spaceshipCenter);
    this.drawRightFoot(ctx, width, height, spaceshipCenter);
    this.drawLeftFoot(ctx, width, height, spaceshipCenter);

    ctx.restore();
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.rotationRadians = this.rotation / (Math.PI * 180);
  }

  public rotate(rotation: number) {
    this.rotation += rotation;
  }
}

export default Spaceship;
