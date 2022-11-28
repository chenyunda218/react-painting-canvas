import { Position, Vector } from "./Properties";
import Action from "./Action";

export class Line implements Action {
  from: Position;
  to: Position;
  color: string;

  constructor(from: Position, to: Position, color?: string) {
    this.from = from;
    this.to = to;
    this.color = color || "#000000";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }

  move(vector: Vector): Line {
    return new Line(this.from.move(vector), this.to.move(vector), this.color);
  }
}
