export default abstract class Shape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public initializedInstance: Shape | undefined;
  abstract draw(): void; 
  abstract drawSelection(): void; 
  constructor(x: number, y: number, ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  debug() {
    console.log("x: ", this.x, "y: ", this.y, "width: ", this.width, "height: ", this.height);
  }
  
  register(that: Shape) {
    this.initializedInstance = that;
  }
}
