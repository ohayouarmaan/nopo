import Rectangle from "../shapes/rectangle";
import Shape from "../shapes/shape";
import Graph from "../utilities/graph";
import Vector2D from "../utilities/vector2d";

export default class Frame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private graph: Graph;
  private nrCols: number = 50;
  private nrRows: number = 30;
  private gridWidth: number;
  private gridHeight: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, graph: Graph) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gridWidth = window.innerWidth / this.nrCols;
    this.gridHeight = window.innerHeight / this.nrRows;
    this.graph = graph;
  }
  
  drawFrames() {
    this.graph.memory.forEach(s => {
      if(s) {
        s.draw();
      }
    })
  }

  drawGrid() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#4d4d4d"
    //console.log("gw: ", this.gridWidth, "gh: ", this.gridHeight, "cw: ", this.canvas.width / this.nrCols, "ch: ", this.canvas.height)
    for (let i = 1; i <= this.nrCols; i++) {
      this.ctx.moveTo(i * (this.gridWidth), 0);
      this.ctx.lineTo(i * this.gridWidth, this.canvas.height);
    }
    for (let i = 0; i <= this.nrRows; i++) {
      this.ctx.moveTo(0, i * this.gridHeight);
      this.ctx.lineTo(this.canvas.width, i * this.gridHeight);
    }
    this.ctx.stroke();
  }

  mouseDown(nativeEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>, setStartPoint: Function, setCurrentShape: Function, setSelectedShape: Function) {
    let sp = (new Vector2D(nativeEvent.pageX, nativeEvent.pageY));
    setStartPoint(sp);
    let i = this.graph.isInsideAShape(sp)
    if(i == -1) {
      setCurrentShape(new Rectangle(sp, sp.add(new Vector2D(5, 5)), this.ctx, {}));
    } else {
      setSelectedShape(this.graph.memory[i]);
    }
  }

  mouseUp(_: React.MouseEvent<HTMLCanvasElement, MouseEvent>, currentShape: Shape | null | undefined, startPoint: Vector2D | null | undefined, setCurrentShape: Function, setStartPoint: Function, selectedShape: Shape | null | undefined, setSelectedShape: Function) {
    if(currentShape && startPoint) {
      this.graph.add(currentShape.initializedInstance!);
      currentShape.initializedInstance?.drawShape();
      setCurrentShape(null);
      setStartPoint(undefined);
    } else if(selectedShape && startPoint) {
      setSelectedShape(null);
      setStartPoint(undefined);
    }
  }

  mouseMove(nativeEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>, currentShape: Shape | null | undefined, startPoint: Vector2D | null | undefined, selectedShape: Shape | null | undefined) {
    const newPoint = new Vector2D(nativeEvent.pageX, nativeEvent.pageY);
    if(currentShape && startPoint) {
      currentShape.width = newPoint.distanceX(startPoint);
      currentShape.height = newPoint.distanceY(startPoint);
      this.init();
      currentShape.draw();
    } else if(selectedShape && startPoint) {
      selectedShape.x = newPoint.x - (0.5 * selectedShape.width);
      selectedShape.y = newPoint.y - (0.5 * selectedShape.height);
      this.init();
      selectedShape.draw();
    }
  }

  init() {
    this.canvas.height = window.innerHeight * 2;
    this.canvas.width = window.innerWidth * 2;
    if(!this.ctx) return;
    this.ctx.fillStyle = "#2e2e2e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(2, 2);
    window.addEventListener("resize", (_) => {
      const newWidth = window.innerWidth * 2;
      const newHeight = window.innerHeight * 2;
      if(!this.canvas){
        return;
      }
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      if(!this.ctx) return;
      this.ctx.fillStyle = "#2e2e2e";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.scale(2, 2);
      this.drawFrames();
      this.drawGrid();
    });
    this.drawGrid();
    this.drawFrames();
  }
}
