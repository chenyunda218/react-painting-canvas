import { Size } from "./Properties";
import Action from "./Action";

export default class Board {
  size: Size;
  actions: Array<Action>;
  ctx?: CanvasRenderingContext2D;

  constructor(
    size: Size,
    actions: Array<Action>,
    ctx?: CanvasRenderingContext2D
  ) {
    this.size = size;
    this.actions = actions;
    this.ctx = ctx;
  }

  draw(ctx?: CanvasRenderingContext2D) {
    const _ctx = ctx || this.ctx;
    console.log(this.actions.length);
    if (_ctx) {
      _ctx.clearRect(0, 0, this.size.width, this.size.height);
      this.actions.forEach((action) => action.draw(_ctx));
    }
  }

  setCtx(ctx: CanvasRenderingContext2D): Board {
    return new Board(this.size, this.actions, ctx);
  }

  setActions(actions: Array<Action>): Board {
    return new Board(this.size, actions, this.ctx);
  }

  push(action: Action): Board {
    return this.setActions([...this.actions, action]);
  }
}
