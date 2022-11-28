import React, { useState, useRef, useEffect, useCallback } from "react";
import PaintMode from "./types/PaintMode";
import "./App.css";
import { Position, Size } from "./types/Properties";
import BoardType from "./types/Board";
import windowEventListener from "./events/windowEventListener";
import { Line } from "./types/Line";

interface IProps {
  mode?: PaintMode;
  size: Size;
}

function drawing(
  startEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  size: Size,
  ctx: CanvasRenderingContext2D,
  board: BoardType,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  mode?: PaintMode
) {
  const offsetX = startEvent.nativeEvent.offsetX;
  const offsetY = startEvent.nativeEvent.offsetY;
  const startX = startEvent.screenX;
  const startY = startEvent.screenY;
  setBoard(
    board.push(
      new Line(
        new Position(offsetX, offsetY),
        new Position(
          offsetX - (startX - startEvent.screenX),
          offsetY - (startY - startEvent.screenY)
        )
      )
    )
  );
  const remove = windowEventListener("mousemove", (e: MouseEvent) => {
    switch (mode) {
      case PaintMode.LINE:
        setBoard(
          board.push(
            new Line(
              new Position(offsetX, offsetY),
              new Position(
                offsetX - (startX - e.screenX),
                offsetY - (startY - e.screenY)
              )
            )
          )
        );
        break;
      case PaintMode.PEN:
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, size.width, size.height);
        break;
    }
  });
  const removeEnd = windowEventListener("mouseup", (e: MouseEvent) => {
    setBoard(
      board.push(
        new Line(
          new Position(offsetX, offsetY),
          new Position(
            offsetX - (startX - e.screenX),
            offsetY - (startY - e.screenY)
          )
        )
      )
    );
    remove();
    removeEnd();
  });
}

const Board: React.FC<IProps> = ({ mode, size }) => {
  const [board, setBoard] = useState(
    new BoardType(new Size(500, 500), new Array())
  );
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    const _canvas = canvas.current;
    if (_canvas != null) {
      const ctx = _canvas.getContext("2d");
      setCtx(ctx);
    }
  }, []);
  const [cursor, setCursor] = useState("");
  const startDraw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (ctx) {
        drawing(e, size, ctx, board, setBoard, mode);
      } else {
        const _canvas = canvas.current;
        if (_canvas != null) {
          const ctx = _canvas.getContext("2d");
          setCtx(ctx);
        }
      }
    },
    [board, size, mode, ctx]
  );
  useEffect(() => {
    switch (mode) {
      case PaintMode.LINE:
        setCursor("crosshair");
        break;
      default:
        setCursor("");
    }
  }, [mode]);
  useEffect(() => {
    if (ctx) {
      board.draw(ctx);
    }
  }, [board]);
  return (
    <div className="App">
      <canvas
        onMouseDown={startDraw}
        ref={canvas}
        style={{
          border: "5px solid red",
          cursor: cursor,
          height: size.height,
          width: size.width,
        }}
        width={size.width}
        height={size.height}></canvas>
    </div>
  );
};

export default Board;
