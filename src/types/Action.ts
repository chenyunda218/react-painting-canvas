import { Position, Vector, Options } from "./Properties";

export default interface Action {
  draw: (ctx: CanvasRenderingContext2D, options?: Options) => void;
  move: (vector: Vector) => Action;
}
