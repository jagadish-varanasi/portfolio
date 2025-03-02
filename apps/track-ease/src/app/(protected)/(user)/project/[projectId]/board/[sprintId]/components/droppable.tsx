import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { TaskCard } from "./task-card";
import type { Column, ParentTask } from "./types";

interface DroppableProps {
  column: Column;
  parentTasks: ParentTask[];
}

export function Droppable({ column, parentTasks }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Card className={`${isOver ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={setNodeRef}
          className="flex flex-col gap-2 min-h-[70vh] p-1 transition-colors"
        >
          {column.childTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              parentTask={parentTasks.find((p) => p.id === task.parentId)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
