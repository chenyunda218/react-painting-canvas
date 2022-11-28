import Action from "./Action";
import { Position } from "./Properties";

export default class Draw implements Action {
  positions: Array<Position>;
  color: string;
  constructor(positions: Array<Position>, color?: string) {
    this.positions = positions;
    this.color = color || "#000000";
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.positions.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      const [head, ...tail] = this.positions;
      ctx.moveTo(head.x, head.y);
      tail.forEach((position) => {
        ctx.lineTo(position.x, position.y);
      });
      ctx.stroke();
    }
  }

  push(position: Position) {
    this.positions.push(position);
  }
}
