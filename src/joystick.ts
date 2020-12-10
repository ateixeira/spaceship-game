class Joystick {
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawExternal(ctx);
    this.drawInternal(ctx);
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
    ctx.arc(
      ctx.canvas.width - 70,
      ctx.canvas.height - 70,
      20,
      0,
      Math.PI * 2,
      false
    );
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "yellow";
    ctx.stroke();
    ctx.fill();
  }
}

export default Joystick;
