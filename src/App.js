import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    // context.scale(1, 1);
    context.lineCap = "butt";
    context.strokeStyle = "black";
    context.lineWidth = 15;
    contextRef.current = context;
  }, [window.innerWidth, window.innerHeight]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    console.log("dataUrl", dataUrl);
    // const link = document.createElement("a");
    // link.href = dataUrl;
    // link.download = "canvas.png";
    // link.click();
  };

  const colorChange = (color) => {
    contextRef.current.strokeStyle = color;
  };

  const strokeChange = (value) => {
    console.log("value", value);
    contextRef.current.lineWidth = value;
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={clearCanvas}>clear</button>
        <button onClick={saveImage}>Save</button>
        <input type="color" onChange={(e) => colorChange(e.target.value)} />
        <input
          type="range"
          min={1}
          max={100}
          onChange={(e) => strokeChange(e.target.value)}
        />
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
