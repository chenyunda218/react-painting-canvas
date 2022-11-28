import { Position } from "./Properties";
import Action from "./Action";

export class Line implements Action {
  from: Position;
  to: Position;
  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }
}
