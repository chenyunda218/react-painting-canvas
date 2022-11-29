export class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  move(vector: Vector): Position {
    return new Position(this.x + vector.x, this.y + vector.y);
  }
}

export interface Nib {
  width: number;
}

export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface Options {
  color?: string;
  alpha?: number;
  nib?: Nib;
  lineWidth?: number;
}
