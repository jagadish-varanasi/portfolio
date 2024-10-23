import { useLayoutEffect } from "react";
import { useCanvas } from "../contexts/CanvasContext";

function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, } =
    useCanvas();

  useLayoutEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default Canvas;
