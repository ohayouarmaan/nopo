export default class Vector2D {
  public readonly x: number;
  public readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceX(that: Vector2D) {
    return this.x - that.x;
  }

  distanceY(that: Vector2D) {
    return this.y - that.y;
  }

  add(that: Vector2D) {
    return new Vector2D(this.x + that.x, this.y + that.y);
  }
}
