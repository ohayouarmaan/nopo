import Shape from "../shapes/shape";

export default class Graph {
  public readonly memory: Shape[];
  constructor() {
    this.memory = [];
  }

  add(s: Shape) {
    this.memory.push(s);
  }
}
