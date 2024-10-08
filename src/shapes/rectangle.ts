import ShapeSettings from "../utilities/shapeSettings";
import Vector2D from "../utilities/vector2d";
import Shape from "./shape";

export default class Rectangle extends Shape {
  private readonly config: ShapeSettings;
  constructor(startPoint: Vector2D, endPoint: Vector2D, ctx: CanvasRenderingContext2D, config: ShapeSettings) {
    super(startPoint.x, startPoint.y, ctx, endPoint.distanceX(startPoint), endPoint.distanceY(startPoint));
    this.config = config;
    this.register(this);
  }

  drawShape() {
    this.ctx.strokeStyle = "cyan";
    let x_dim = this.width < 0 ? 5 : -5;
    let y_dim = this.height < 0 ? 5 : -5;
    this.debug();
    console.log(x_dim, y_dim);
    this.ctx.strokeRect(this.x + x_dim, this.y + y_dim, this.width - x_dim * 2, this.height - y_dim * 2);
  }

  draw() {
    this.ctx.strokeStyle = this.config.borderColor || "white";
    this.debug();
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};
