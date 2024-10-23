import { useCanvas } from "../contexts/CanvasContext";
import { Button } from "@repo/ui/components/button";
import {
  XIcon,
  UndoIcon,
  RedoIcon,
  EraserIcon,
  DownloadIcon,
} from "lucide-react";

export const Toolbar = () => {
  const { clearCanvas, undo, redo, erase, download, isEraseActive } =
    useCanvas();

  return (
    <>
      <div className="absolute w-7 h-7 top-8 left-8">
        <div className="flex items-center gap-1">
          <img src="drawit.png" className=" rounded-full" />
          <div className="font-bold">DrawIt.</div>
        </div>
      </div>
      <div className="w-72 absolute bg-gray-50 mx-auto top-4 left-[50%] translate-x-[-50%] py-2 shadow-2xl border">
        <div className="flex gap-4 justify-center">
          <Button
            onClick={erase}
            variant={isEraseActive ? "default" : "ghost"}
            size={"icon"}
          >
            <EraserIcon />
          </Button>
          <Button onClick={undo} variant="ghost" size={"icon"}>
            <UndoIcon />
          </Button>
          <Button onClick={redo} variant="ghost" size={"icon"}>
            <RedoIcon />
          </Button>
          <Button onClick={download} variant="ghost" size={"icon"}>
            <DownloadIcon />
          </Button>
          <Button onClick={clearCanvas} variant="ghost" size={"icon"}>
            <XIcon />
          </Button>
        </div>
      </div>
    </>
  );
};
