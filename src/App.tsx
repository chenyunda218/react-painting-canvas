import Board from "./Board";
import { Size } from "./types/Properties";
import PaintMode from "./types/PaintMode";
import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState(PaintMode.LINE);
  return (
    <div>
      <button onClick={() => setMode(PaintMode.NONE)}>none</button>
      <button onClick={() => setMode(PaintMode.LINE)}>line</button>
      <button onClick={() => setMode(PaintMode.PEN)}>PEN</button>
      {mode}
      <Board mode={mode} size={new Size(500, 500)}></Board>
    </div>
  );
}

export default App;
