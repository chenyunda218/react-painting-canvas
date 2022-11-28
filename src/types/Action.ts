import { Position } from "./Properties";

export default interface Action {
  draw: (ctx: CanvasRenderingContext2D, color?: string) => void;
  // move: ()
}
