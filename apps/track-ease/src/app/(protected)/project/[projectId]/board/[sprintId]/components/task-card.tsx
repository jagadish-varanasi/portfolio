import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@repo/ui/components/badge";
import { BookCheckIcon, ClipboardCheck, GripVertical } from "lucide-react";
import type { ChildTask, ParentTask } from "./types";

interface TaskCardProps {
  task: ChildTask;
  parentTask?: ParentTask;
}

export function TaskCard({ task, parentTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
        status: task.status,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group p-3 bg-card border rounded-lg shadow-sm select-none
      ${isDragging ? "opacity-50" : ""}
      hover:border-primary/50 transition-colors`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="touch-none cursor-grab active:cursor-grabbing hover:text-primary"
          >
            <GripVertical className="h-5 w-5 text-[#a9aaac]" />
          </div>
          <div className="text-sm font-medium">{task.content}</div>
        </div>
        {parentTask && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs w-1/2">
              <ClipboardCheck className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[80%]">
                {parentTask.content}
              </span>
            </Badge>
            <Badge variant="secondary" className="text-xs w-1/2">
              <BookCheckIcon className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[80%]">{parentTask.epic}</span>
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
