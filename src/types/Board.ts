import { Size, Position, Vector } from "./Properties";
import { Line } from "./Line";
import Action from "./Action";
import PaintMode from "./PaintMode";
import windowEventListener from "../events/windowEventListener";
import Draw from "./Draw";
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

  draw(ctx?: CanvasRenderingContext2D, color?: string) {
    const _ctx = ctx || this.ctx;
    if (_ctx) {
      _ctx.clearRect(0, 0, this.size.width, this.size.height);
      this.actions.forEach((action) => action.draw(_ctx, color));
    }
  }

  setCtx(ctx: CanvasRenderingContext2D): Board {
    return new Board(this.size, this.actions, ctx);
  }

  setActions(actions: Array<Action>): Board {
    return new Board(this.size, actions, this.ctx);
  }

  move(vector: Vector): Board {
    return new Board(
      this.size,
      this.actions.map((a) => a.move(vector)),
      this.ctx
    );
  }

  push(action: Action): Board {
    return this.setActions([...this.actions, action]);
  }

  startDraw(
    startEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    color: string,
    mode?: PaintMode,
    moveCB?: (board: Board) => void,
    endCB?: (board: Board) => void
  ) {
    switch (mode) {
      case PaintMode.LINE:
        if (moveCB) this.drawLine(startEvent, color, moveCB, endCB);
        break;
      case PaintMode.DRAW:
        if (moveCB) this.drawDraw(startEvent, color, moveCB, endCB);
        break;
      case PaintMode.MOVE:
        if (moveCB) this.drawMove(startEvent, moveCB, endCB);
        break;
    }
  }

  private drawMove(
    startEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    moveCB?: (board: Board) => void,
    endCB?: (board: Board) => void
  ) {
    const startX = startEvent.screenX;
    const startY = startEvent.screenY;
    const remove = windowEventListener("mousemove", (ev) => {
      moveCB!(this.move(new Vector(ev.screenX - startX, ev.screenY - startY)));
    });
    const removeEnd = windowEventListener("mouseup", (ev) => {
      endCB!(this.move(new Vector(ev.screenX - startX, ev.screenY - startY)));
      remove();
      removeEnd();
    });
  }

  private drawDraw(
    startEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    color: string,
    moveCB?: (board: Board) => void,
    endCB?: (board: Board) => void
  ) {
    const offsetX = startEvent.nativeEvent.offsetX;
    const offsetY = startEvent.nativeEvent.offsetY;
    const startX = startEvent.screenX;
    const startY = startEvent.screenY;
    const draw = new Draw([new Position(offsetX, offsetY)], color);
    const remove = windowEventListener("mousemove", (ev) => {
      draw.push(
        new Position(
          offsetX - (startX - ev.screenX),
          offsetY - (startY - ev.screenY)
        )
      );
      moveCB!(this.push(draw));
    });
    const removeEnd = windowEventListener("mouseup", (ev) => {
      draw.push(
        new Position(
          offsetX - (startX - ev.screenX),
          offsetY - (startY - ev.screenY)
        )
      );
      endCB!(this.push(draw));
      remove();
      removeEnd();
    });
  }

  private drawLine(
    startEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    color: string,
    moveCB?: (board: Board) => void,
    endCB?: (board: Board) => void
  ) {
    const offsetX = startEvent.nativeEvent.offsetX;
    const offsetY = startEvent.nativeEvent.offsetY;
    const startX = startEvent.screenX;
    const startY = startEvent.screenY;
    moveCB!(
      this.push(
        new Line(
          new Position(offsetX, offsetY),
          new Position(
            offsetX - (startX - startEvent.screenX),
            offsetY - (startY - startEvent.screenY)
          ),
          color
        )
      )
    );
    const remove = windowEventListener("mousemove", (ev) => {
      moveCB!(
        this.push(
          new Line(
            new Position(offsetX, offsetY),
            new Position(
              offsetX - (startX - ev.screenX),
              offsetY - (startY - ev.screenY)
            ),
            color
          )
        )
      );
    });
    const removeEnd = windowEventListener("mouseup", (ev) => {
      endCB!(
        this.push(
          new Line(
            new Position(offsetX, offsetY),
            new Position(
              offsetX - (startX - ev.screenX),
              offsetY - (startY - ev.screenY)
            ),
            color
          )
        )
      );
      remove();
      removeEnd();
    });
  }
  setSize(size: Size): Board {
    return new Board(size, this.actions, this.ctx);
  }
}
