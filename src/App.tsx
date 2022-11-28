import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const startDraw = useCallback(() => {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(400, 400);
      ctx.stroke();
      console.log("ctx");
    } else {
      console.log("else");
      const _canvas = canvas.current;
      if (_canvas != null) {
        console.log("2d");
        const ctx = _canvas.getContext("2d");
        setCtx(ctx);
      }
    }
  }, [ctx]);
  useEffect(() => {
    const _canvas = canvas.current;
    if (_canvas != null) {
      const ctx = _canvas.getContext("2d");
      setCtx(ctx);
    }
  }, []);
  return (
    <div className="App" style={{}} onClick={() => startDraw()}>
      <canvas
        ref={canvas}
        style={{ border: "5px solid red" }}
        width={width}
        height={height}></canvas>
    </div>
  );
}

export default App;
