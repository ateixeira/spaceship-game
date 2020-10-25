import Vector from "./lib/vector";

class Spaceship {
  public position: Vector;

  constructor(width: number, height: number) {
    this.position = Vector.random(0, width, 0, height);
  }

  public static draw(
    cx: number,
    cy: number,
    width: number = 8,
    height: number = 40,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    // Half bottom line
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + width * 0.3, cy);
    // Right curved line
    ctx.bezierCurveTo(
      cx + width,
      cy - height * 0.2,
      cx + width,
      cy - height * 0.8,
      cx,
      cy - height
    );
    // Left curved line
    ctx.bezierCurveTo(
      cx - width,
      cy - height * 0.8,
      cx - width,
      cy - height * 0.2,
      cx - width * 0.3,
      cy
    );
    // Other half bottom line
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
    // Window
    const windowRadius = width * 0.3;
    const windowYPosition = cy - height * 0.6;
    ctx.moveTo(cx + windowRadius, windowYPosition);
    ctx.arc(cx, windowYPosition, windowRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // Right `foot`
    ctx.moveTo(cx + width * 0.85, cy - height * 0.35);
    ctx.quadraticCurveTo(
      cx + width * 2,
      cy - height * 0.2,
      cx + width * 0.75,
      cy + height * 0.1
    );
    ctx.quadraticCurveTo(
      cx + width * 1.4,
      cy - height * 0.1,
      cx + width * 0.7,
      cy - height * 0.15
    );

    // Left `foot`
    ctx.moveTo(cx - width * 0.85, cy - height * 0.35);
    ctx.quadraticCurveTo(
      cx - width * 2,
      cy - height * 0.2,
      cx - width * 0.75,
      cy + height * 0.1
    );
    ctx.quadraticCurveTo(
      cx - width * 1.4,
      cy - height * 0.1,
      cx - width * 0.7,
      cy - height * 0.15
    );

    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
}

export default Spaceship;
