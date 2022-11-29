import { Options, Position, Vector } from "./Properties";
import Action from "./Action";

export class Line implements Action {
  from: Position;
  to: Position;
  options?: Options;

  constructor(from: Position, to: Position, options?: Options) {
    this.from = from;
    this.to = to;
    this.options = options;
  }

  get color(): string {
    if (this.options && this.options.color) return this.options.color;
    return "#000000";
  }

  get alpha(): number {
    if (this.options && this.options.alpha) return this.options.alpha;
    return 1.0;
  }

  get lineWidth(): number {
    if (this.options && this.options.lineWidth) return this.options.lineWidth;
    return 1.0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.from.x, this.from.y, this.lineWidth / 2, 0, 2 * Math.PI);
    ctx.arc(this.to.x, this.to.y, this.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }

  move(vector: Vector): Line {
    return new Line(this.from.move(vector), this.to.move(vector), this.options);
  }
}
