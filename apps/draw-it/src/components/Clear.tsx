import { useCanvas } from "../contexts/CanvasContext";

export const Clear = () => {
  const { clearCanvas } = useCanvas();

  return <button onClick={clearCanvas}>Clear</button>;
};
