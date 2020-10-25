import Spaceship from "./spaceship";
import Star from "./star";

export class SpaceshipGame {
  private readonly STARCOUNT = 100;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private spaceship: Spaceship;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    document.body.appendChild(this.canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.spaceship = new Spaceship(this.canvas.width, this.canvas.height);

    this.config();

    window.addEventListener("keydown", this.keyboardListener);

    requestAnimationFrame(() => this.draw());
  }

  private config() {
    this.stars = [];
    const { width, height } = this.canvas;
    for (let i = 0; i < this.STARCOUNT; i++) {
      this.stars.push(new Star(width, height));
    }
  }

  private resizeCanvasIfNeeded() {
    if (
      this.canvas.width !== innerWidth ||
      this.canvas.height !== innerHeight
    ) {
      this.canvas.width = innerWidth; // resize this.canvas
      this.canvas.height = innerHeight; // also clears this.canvas
      this.config();
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private draw() {
    this.resizeCanvasIfNeeded();
    for (let star of this.stars) {
      Star.draw(
        star.position.x,
        star.position.y,
        star.vertices,
        star.size,
        this.ctx
      );
    }

    Spaceship.draw(
      this.canvas.width / 2,
      this.canvas.height / 2,
      15,
      60,
      this.ctx
    );

    requestAnimationFrame(() => this.draw());
  }

  private keyboardListener(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        // Down key
        console.log("Down");
        break;
      case "KeyW":
      case "ArrowUp":
        // Up key
        console.log("Up");
        break;
      case "KeyA":
      case "ArrowLeft":
        // Left key
        console.log("Left");
        break;
      case "KeyD":
      case "ArrowRight":
        // Right key
        console.log("Right");
        break;
    }
  }
}
