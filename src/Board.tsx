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
  color: string;
}

const Board: React.FC<IProps> = ({ mode, size, color }) => {
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
        board.startDraw(
          e,
          color,
          mode,
          (newBoard) => {
            setBoard(newBoard);
          },
          (newBoard) => {
            console.log("save");
            setBoard(newBoard);
          }
        );
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
