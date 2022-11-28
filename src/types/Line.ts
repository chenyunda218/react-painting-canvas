import { Position } from "./Position";
import { Switch } from "react-router-dom";

export class Line {
  from: Position;
  to: Position;
  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }
}
