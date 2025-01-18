import React from "react";
import { KanbanBoard } from "./components/KanbanBoard";
import prisma from "@/lib/db";
import { Task } from "./components/TaskCard";

async function page({
  params: { sprintId },
  searchParams,
}: {
  params: { releaseId: string; sprintId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
    include: {
      release: { select: { name: true } },
      tasks: {
        select: { description: true, id: true, title: true, status: true },
      },
    },
  });
  console.log(sprint, "Sprint");
  const tasks: Task[] = sprint
    ? sprint?.tasks.map((task) => ({
        id: task.id,
        columnId: task.status as any,
        title: task.title,
        description: task.description,
      }))
    : [];
  return (
    <div className="mt-4">
      <KanbanBoard tasks={tasks} />
    </div>
  );
}

export default page;
