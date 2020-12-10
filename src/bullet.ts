import Vector from "./lib/vector";

class Bullet {
  public position: Vector;
  public angle: number;
  private speed: number = 10;
  public alive: boolean = true;

  constructor(position: Vector, angle: number) {
    this.position = new Vector(position.x, position.y);
    this.angle = angle;
  }

  public draw(x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  public update(ctx: CanvasRenderingContext2D) {
    const x = Math.sin(this.angle) * this.speed;
    const y = -Math.cos(this.angle) * this.speed;

    this.position.add(new Vector(x, y));

    // handle edge of screen
    if (this.position.x > ctx.canvas.width) {
      this.alive = false;
    } else if (this.position.y < 0) {
      this.alive = false;
    }
    if (this.position.y > ctx.canvas.height) {
      this.alive = false;
    } else if (this.position.x < 0) {
      this.alive = false;
    }
  }
}

export default Bullet;
