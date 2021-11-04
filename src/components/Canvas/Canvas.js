import { useEffect, useState, useRef } from 'react'

const Canvas = () => {
  
  const canvasRef = useRef(null);
  let pos = {x: 0, y: 0};
  // const [pos, setPos] = useState({ x: 0, y: 0});


  console.log(pos)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function setPosition(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    
    const draw = (e) => {
      if (e.buttons !== 1) return;
    
      ctx.beginPath(); 
    
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#c0392b';
    
      ctx.moveTo(pos.x, pos.y); 
      setPosition(e);
      ctx.lineTo(pos.x, pos.y); 
    
      ctx.stroke(); 
    }

    document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mouseenter', setPosition);

    return () => {
      document.removeEventListener('mousedown', draw);
      document.removeEventListener('mousedown', setPosition);
      document.removeEventListener('mouseenter', setPosition)
    }
  }, []);


  return <canvas ref={canvasRef} />
}

export default Canvas