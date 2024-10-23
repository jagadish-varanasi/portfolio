import { useCanvas } from "../contexts/CanvasContext";
import { Button } from "@repo/ui/components/button";

export const Clear = () => {
  const { clearCanvas, undo, redo, erase, isEraseActive } = useCanvas();

  return (
    <>
      <Button onClick={clearCanvas} variant="secondary">
        Clear
      </Button>
      <Button onClick={undo} variant="secondary">
        Undo
      </Button>
      <Button onClick={redo} variant="secondary">
        Redo
      </Button>
      <Button onClick={erase} variant={isEraseActive ? "default" : "secondary"}>
        Erase
      </Button>
    </>
  );
};
