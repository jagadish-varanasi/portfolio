import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { TaskCard } from "./task-card";
import type { Column, ParentTask } from "./types";

interface DroppableColumnProps {
  column: Column;
  parentTasks: ParentTask[];
}

export function DroppableColumn({ column, parentTasks }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Card className={isOver ? "ring-2 ring-primary" : ""}>
      <CardHeader>
        <CardTitle className="text-xl">{column.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext
          items={column.childTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            className="flex flex-col gap-2 min-h-[70vh] p-1"
          >
            {column.childTasks.map((child) => (
              <TaskCard
                key={child.id}
                task={child}
                parentTask={parentTasks.find((p) => p.id === child.parentId)}
              />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}
