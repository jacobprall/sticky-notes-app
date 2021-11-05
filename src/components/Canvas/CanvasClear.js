import React from 'react'
import { useCanvas } from '../../hooks/useContextCanvas';
import './canvas.scss';

const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <button className="canvas-clear" onClick={() => clearCanvas()}>Clear Canvas</button>
}

export default ClearCanvasButton;