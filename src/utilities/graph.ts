import Shape from "../shapes/shape";
import Vector2D from "./vector2d";

export default class Graph {
  public readonly memory: Shape[];
  constructor() {
    this.memory = [];
  }

  isInsideAShape(position: Vector2D): number {
    for(let i = this.memory.length - 1; i >= 0; i--) {
      if(this.memory[i].width < 0) {
        if(this.memory[i].height < 0) {
          if(
            position.x > this.memory[i].x + this.memory[i].width &&
            position.y > this.memory[i].y + this.memory[i].height &&
            position.x < this.memory[i].x &&
            position.y < this.memory[i].y
          ) {
            return i;
          }
        }
      }
      if(this.memory[i].height < 0 && this.memory[i].width > 0) {
        if(
          this.memory[i].x < position.x &&
          position.x < this.memory[i].x + this.memory[i].width &&
          this.memory[i].y > position.y &&
          position.y > this.memory[i].y + this.memory[i].height
        ) {
          return i;
        }
      }
      if(
        this.memory[i].x < position.x &&
        position.x < this.memory[i].x + this.memory[i].width &&
        this.memory[i].y < position.y &&
        position.y < this.memory[i].y + this.memory[i].height
      ) {
        return i;
      }
    }
    return -1;
  }

  add(s: Shape) {
    this.memory.push(s);
  }
}
