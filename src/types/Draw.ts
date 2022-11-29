import Action from "./Action";
import { Options, Position, Vector } from "./Properties";

export default class Draw implements Action {
  positions: Array<Position>;
  options?: Options;

  constructor(positions: Array<Position>, options?: Options) {
    this.positions = positions;
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

  move(vector: Vector): Draw {
    return new Draw(
      this.positions.map((p) => p.move(vector)),
      this.options
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.positions.length > 0) {
      ctx.lineWidth = this.lineWidth;
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = this.color;
      const [head, ...tail] = this.positions;
      let lastPosition = head;
      tail.forEach((position) => {
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
        lastPosition = position;
      });
      ctx.lineWidth = 0;
      this.positions.forEach((position) => {
        ctx.beginPath();
        ctx.arc(position.x, position.y, this.lineWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }

  push(position: Position) {
    this.positions.push(position);
  }
}
