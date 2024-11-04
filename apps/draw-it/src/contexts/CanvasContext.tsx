import React, { useContext, useRef, useState } from "react";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null>;
  prepareCanvas: () => void;
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
  clearCanvas: () => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  undo: () => void;
  redo: () => void;
  erase: () => void;
  download: () => void;
  isEraseActive: boolean;
}

const CanvasContext = React.createContext<CanvasContextType | undefined>(
  undefined
);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const shouldDraw = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const drawHistory = useRef<any>([]);
  const historyPointer = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isEraseActive, setIsEraseActive] = useState(false);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;

      const context = canvas.getContext("2d");
      if (context) {
        // context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(clientX, clientY);
      shouldDraw.current = true;
    }
  };

  const finishDrawing = () => {
    if (!contextRef.current || !canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const imageData = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    drawHistory.current.push(imageData);
    historyPointer.current = drawHistory.current.length - 1;
    shouldDraw.current = false;
    contextRef.current.closePath();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!shouldDraw.current || !contextRef.current) {
      return;
    }
    const { clientX, clientY } = event;
    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.fillStyle = "white";
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const undo = () => {
    if (!contextRef.current) return;

    if (historyPointer.current > 0) historyPointer.current -= 1;
    const imageData = drawHistory.current[historyPointer.current];
    contextRef.current.putImageData(imageData, 0, 0);
  };

  const redo = () => {
    if (!contextRef.current) return;

    if (historyPointer.current < drawHistory.current.length - 1)
      historyPointer.current += 1;
    const imageData = drawHistory.current[historyPointer.current];
    contextRef.current.putImageData(imageData, 0, 0);
  };

  const erase = () => {
    if (!contextRef.current) return;
    const erase = !isEraseActive;

    const context = contextRef.current;

    if (erase) {
      context.strokeStyle = "white";
      context.lineWidth = 100;
    } else {
      context.strokeStyle = "black";
      context.lineWidth = 5;
    }

    setIsEraseActive(erase);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const URL = canvas.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = URL;
    anchor.download = "sketch.jpg";
    anchor.click();
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        undo,
        redo,
        erase,
        download,
        isEraseActive,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvas = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
