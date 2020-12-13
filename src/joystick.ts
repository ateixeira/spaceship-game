import {
  angleForPointInCircumference,
  distanceBetweenPoints,
  isPointInCircumference,
} from "./lib/helpers";
import Vector from "./lib/vector";

class Joystick {
  private position: Vector;
  private stickPosition: Vector;
  private centerPosition: Vector;
  private isPressed: boolean = false;
  private ctx: CanvasRenderingContext2D;

  private readonly joystickOffset: number = 70;
  private readonly externalRadius: number = 35;
  private readonly internalRadius: number = 15;

  constructor(ctx: CanvasRenderingContext2D, isMobile: boolean = false) {
    this.ctx = ctx;
    this.centerPosition = new Vector(
      ctx.canvas.width - this.joystickOffset,
      ctx.canvas.height - this.joystickOffset
    );
    this.stickPosition = new Vector(
      this.centerPosition.x,
      this.centerPosition.y
    );
    this.position = new Vector(this.centerPosition.x, this.centerPosition.y);

    if (isMobile) {
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

  public get x() {
    return this.position.x;
  }

  public get y() {
    return this.position.y;
  }

  public get stickX() {
    return this.stickPosition.x - this.centerPosition.x;
  }

  public get stickY() {
    return this.stickPosition.y - this.centerPosition.y;
  }

  public get angle(): number {
    return angleForPointInCircumference(
      new Vector(this.x, this.y),
      this.centerPosition
    );
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
      this.externalRadius,
      0,
      Math.PI * 2
    );
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgba(222, 222, 222, 0.5)";
    ctx.stroke();
    ctx.fill();
  }

  public drawInternal(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.stickPosition.x,
      this.stickPosition.y,
      this.internalRadius,
      0,
      Math.PI * 2
    );
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgba(244, 244, 244, 0.8)";
    ctx.stroke();
    ctx.fill();
  }

  private onTouchStart(e: TouchEvent) {
    e.preventDefault();
    this.isPressed = true;
  }

  private onTouchMove(e: TouchEvent) {
    e.preventDefault();
    const { pageX, pageY } = e.targetTouches[0];
    const diffRadius = this.externalRadius - this.internalRadius;
    const isInsideJoystick = isPointInCircumference(
      new Vector(pageX, pageY),
      this.centerPosition,
      diffRadius
    );

    if (this.isPressed) {
      this.position.x = pageX;
      this.position.y = pageY;
      this.stickPosition.x = pageX;
      this.stickPosition.y = pageY;
    }
  }

  private onTouchEnd(e: TouchEvent) {
    e.preventDefault();
    this.isPressed = false;
    this.stickPosition.x = this.centerPosition.x;
    this.stickPosition.y = this.centerPosition.y;
  }
}

export default Joystick;
