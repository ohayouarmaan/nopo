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

  draw() {
    this.ctx.strokeStyle = this.config.borderColor || "white";
    this.debug();
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};
