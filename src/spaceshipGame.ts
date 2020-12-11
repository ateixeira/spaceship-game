import Analytics from "./analytics";
import Joystick from "./joystick";
import Spaceship from "./spaceship";
import Star from "./star";
import Bullet from "./bullet";

export class SpaceshipGame {
  private readonly STARCOUNT = 100;
  private readonly SPACESHIP_HEIGHT = 15;
  private canvas: HTMLCanvasElement;
  private infoPanel: HTMLDivElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private bullets: Bullet[] = [];
  private spaceship: Spaceship;
  private analytics: Analytics;
  private pressedKeys: { [key: string]: boolean } = {};
  private joystick: Joystick;

  constructor() {
    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    document.body.appendChild(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Create the stats panel
    this.infoPanel = document.createElement("div");
    this.infoPanel.className = "infoPanel open";
    const statsPanel: HTMLDivElement = document.createElement("div");
    statsPanel.className = "statsPanel";
    const openButton: HTMLDivElement = document.createElement("div");
    openButton.className = "openButton";
    openButton.innerHTML = ">";
    openButton.addEventListener("click", () =>
      this.infoPanel.classList.toggle("open")
    );

    statsPanel.appendChild(openButton);
    statsPanel.appendChild(this.infoPanel);
    document.body.appendChild(statsPanel);

    // Create the Spaceship
    this.spaceship = new Spaceship(
      this.canvas.width,
      this.canvas.height,
      this.SPACESHIP_HEIGHT
    );

    this.analytics = new Analytics();
    this.joystick = new Joystick();

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
    // this.analytics.start();
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
    const stats = this.analytics.tick();
    this.infoPanel.innerHTML = `FPS: ${stats.fps}`;

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

    // Clean up out of boundaries bullets
    this.bullets = this.bullets.filter((b: Bullet) => !!b.alive);

    // Update and draw bullets
    for (const bullet of this.bullets) {
      bullet.update(this.ctx);
      bullet.draw(bullet.position.x, bullet.position.y, this.ctx);
    }

    // Update spaceship state
    this.spaceship.update(this.ctx);

    const { shipPosition, shipRotation } = this.spaceship;
    // Draw the spaceship
    this.spaceship.draw(shipPosition.x, shipPosition.y, this.ctx);

    if ("ontouchstart" in document.documentElement) {
      this.ctx.canvas.addEventListener("touchstart", this.onTouchStart, false);
      this.ctx.canvas.addEventListener("touchmove", this.onTouchMove, false);
      this.ctx.canvas.addEventListener("touchend", this.onTouchEnd, false);
      this.joystick.draw(this.ctx);
    }

    // Game Loop
    requestAnimationFrame(() => this.draw());
  }

  private onTouchStart(e: TouchEvent) {
    e.preventDefault();
    console.log("onTouchStart handler");
  }
  private onTouchMove(e: TouchEvent) {
    e.preventDefault();
    console.log("onTouchMove handler");
  }
  private onTouchEnd(e: TouchEvent) {
    e.preventDefault();
    console.log("onTouchEnd handler");
  }

  private keyboardListener(event: KeyboardEvent) {
    this.pressedKeys[event.code] = event.type === "keydown";

    if (this.pressedKeys["ArrowLeft"] || this.pressedKeys["KeyA"]) {
      this.spaceship.rotate(-this.spaceship.rotationSpeed * (180 / Math.PI));
    }

    if (this.pressedKeys["ArrowRight"] || this.pressedKeys["KeyD"]) {
      this.spaceship.rotate(this.spaceship.rotationSpeed * (180 / Math.PI));
    }

    if (this.pressedKeys["ArrowUp"] || this.pressedKeys["KeyW"]) {
      this.spaceship.isShipThrottling = true;
    } else {
      this.spaceship.isShipThrottling = false;
    }

    if (this.pressedKeys["Space"]) {
      this.bullets.push(
        new Bullet(this.spaceship.shipPosition, this.spaceship.rotationRadians)
      );
    }
  }
}
