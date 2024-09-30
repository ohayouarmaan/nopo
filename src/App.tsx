import { useState, useRef, useEffect } from "react";
import "./App.css";
import Vector2D from "./utilities/vector2d";
import Rectangle from "./shapes/rectangle";
import Frame from "./frame/frame";
import Graph from "./utilities/graph";
import Shape from "./shapes/shape";

function App() {
  const mainCanvas = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startPoint, setStartPoint] = useState<Vector2D>();
  const [currentShape, setCurrentShape] = useState<Shape | null>();
  const [graph, _] = useState(new Graph());
  const [frame, setFrame] = useState<Frame>();
  const [selectedShape, setSelectedShape] = useState<Shape | null>();

  useEffect(() => {
    if(!mainCanvas.current) return;
    setContext(mainCanvas.current.getContext("2d"));
    if(!context) return;
    const fr = new Frame(mainCanvas.current, context, graph);
    setFrame(fr);
    if(fr) fr.init();
  }, [mainCanvas.current])

  return (
    <div className="main-canvas-outer">
      <canvas
        onMouseDown={(e) => frame?.mouseDown(e, setStartPoint, setCurrentShape, setSelectedShape)}
        onMouseMove={(e) => frame?.mouseMove(e, currentShape, startPoint, selectedShape)}
        onMouseUp={(e) => frame?.mouseUp(e, currentShape, startPoint, setCurrentShape, setStartPoint, selectedShape, setSelectedShape)}

        className="main-canvas"
        ref={mainCanvas}
      >
      </canvas>
    </div>
  );
}

export default App;
