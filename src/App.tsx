import Board from "./Board";
import { Size } from "./types/Properties";
import PaintMode from "./types/PaintMode";
import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState(PaintMode.LINE);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(new Size(500, 500));

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setSize(new Size(Number(e.target.value), size.height))}
        value={size.width}></input>
      <input
        type="number"
        onChange={(e) => setSize(new Size(size.width, Number(e.target.value)))}
        value={size.height}></input>
      <button onClick={() => setMode(PaintMode.NONE)}>NONE</button>
      <button onClick={() => setMode(PaintMode.LINE)}>LINE</button>
      <button onClick={() => setMode(PaintMode.DRAW)}>DRAW</button>
      <button onClick={() => setMode(PaintMode.MOVE)}>MOVE</button>
      <input type="color" onChange={(e) => setColor(e.target.value)} />
      {mode}
      <Board color={color} mode={mode} size={size}></Board>
    </div>
  );
}

export default App;
