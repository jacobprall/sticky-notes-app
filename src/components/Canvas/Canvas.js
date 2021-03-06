import React, { useEffect } from "react";
import { useCanvas } from "../../hooks/useContextCanvas";

const Canvas = ({ active }) => {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{'pointerEvents': active ? 'all' : 'none', zIndex: active ? 9 : 1 }}
    />
  );
}

export default Canvas;