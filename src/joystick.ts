class Joystick {
  private isPressed: boolean = false;
  private positionX: number;
  private positionY: number;
  private centerPosition: { x: number; y: number };
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.centerPosition = {
      x: ctx.canvas.width - 70,
      y: ctx.canvas.height - 70,
    };
    this.positionX = this.centerPosition.x;
    this.positionY = this.centerPosition.y;

    if ("ontouchstart" in document.documentElement) {
      this.ctx.canvas.addEventListener(
        "touchstart",
        this.onTouchStart.bind(this),
        false
      );
      this.ctx.canvas.addEventListener(
        "touchmove",
        this.onTouchMove.bind(this),
        false
      );
      this.ctx.canvas.addEventListener(
        "touchend",
        this.onTouchEnd.bind(this),
        false
      );
    }
  }

  public draw() {
    this.drawExternal(this.ctx);
    this.drawInternal(this.ctx);
  }

  public drawExternal(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      ctx.canvas.width - 70,
      ctx.canvas.height - 70,
      35,
      0,
      Math.PI * 2,
      false
    );
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.fill();
  }

  public drawInternal(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, 20, 0, Math.PI * 2, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "yellow";
    ctx.stroke();
    ctx.fill();
  }

  private onTouchStart(e: TouchEvent) {
    e.preventDefault();
    this.isPressed = true;
  }
  private onTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (this.isPressed) {
      this.positionX = e.targetTouches[0].pageX;
      this.positionY = e.targetTouches[0].pageY;
    }
  }
  private onTouchEnd(e: TouchEvent) {
    e.preventDefault();
    this.isPressed = false;
    this.positionX = this.centerPosition.x;
    this.positionY = this.centerPosition.y;
  }
}

export default Joystick;
