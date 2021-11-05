
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
    const appContainer = document.getElementById('app-container');
    prepareCanvas(appContainer);
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