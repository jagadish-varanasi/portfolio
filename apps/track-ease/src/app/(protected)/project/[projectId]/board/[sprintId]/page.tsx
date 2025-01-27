import React from "react";
import { KanbanBoard } from "./components/KanbanBoard";
import prisma from "@/lib/db";
import { Task } from "./components/TaskCard";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
  description: "Board Home Page",
};

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
    <div>
      <div className="max-w-[1050px] mx-auto my-1">
        <div className="flex justify-between items-center">
          <div className="font-bold">{sprint?.name}</div>
          <Link
            href={`/project/${sprint?.projectId}/tasks/create?sprintId=${sprint?.id}`}
          >
            <Button>Add Task</Button>
          </Link>
        </div>
      </div>
      <KanbanBoard tasks={tasks} />
    </div>
  );
}

export default page;
