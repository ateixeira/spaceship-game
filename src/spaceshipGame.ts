import Analytics from "./analytics";
import Spaceship from "./spaceship";
import Star from "./star";

export class SpaceshipGame {
  private readonly STARCOUNT = 100;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private spaceship: Spaceship;
  private analytics: Analytics;
  private pressedKeys: { [key: string]: boolean } = {};

  constructor() {
    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    document.body.appendChild(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Create the Spaceship
    this.spaceship = new Spaceship(this.canvas.width, this.canvas.height);

    this.analytics = new Analytics({ displayPanel: true }, this.ctx);

    this.config();

    // Listeners
    window.addEventListener("keydown", this.keyboardListener.bind(this));
    window.addEventListener("keyup", this.keyboardListener.bind(this));

    requestAnimationFrame(() => this.draw());
  }

  private config() {
    // Stars
    this.stars = [];
    const { width, height } = this.canvas;
    for (let i = 0; i < this.STARCOUNT; i++) {
      this.stars.push(new Star(width, height));
    }

    // Fps meter
    this.analytics.start();
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
    this.analytics.tick();

    // Responsivity
    this.resizeCanvasIfNeeded();

    // Draw starts
    for (let star of this.stars) {
      star.draw(
        star.position.x,
        star.position.y,
        star.vertices,
        star.size,
        this.ctx
      );
    }

    // Update spaceship state
    this.spaceship.update(this.ctx);

    const { shipPosition, shipRotation } = this.spaceship;
    // Draw the spaceship
    this.spaceship.draw(
      shipPosition.x,
      shipPosition.y,
      15,
      shipRotation,
      this.ctx
    );

    // Game Loop
    requestAnimationFrame(() => this.draw());
  }

  private keyboardListener(event: KeyboardEvent) {
    this.pressedKeys[event.code] = event.type === "keydown";

    if (this.pressedKeys["ArrowLeft"] || this.pressedKeys["KeyA"]) {
      this.spaceship.rotate(-this.spaceship.rotationSpeed * (180 / Math.PI));
    }

    if (this.pressedKeys["ArrowRight"] || this.pressedKeys["KeyD"]) {
      this.spaceship.rotate(this.spaceship.rotationSpeed * (180 / Math.PI));
    }
  }
}
