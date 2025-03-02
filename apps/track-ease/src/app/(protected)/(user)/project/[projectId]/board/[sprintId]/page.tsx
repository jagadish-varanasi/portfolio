import React from "react";
import prisma from "@/lib/db";
import { Metadata } from "next";
import KanbanBoard from "./components/kanban-board";

export const metadata: Metadata = {
  title: "Board",
  description: "Board Home Page",
};

async function page({
  params: { projectId, sprintId },
  searchParams,
}: {
  params: { projectId: string; sprintId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
    include: {
      release: { select: { name: true, id: true } },
      tasks: {
        select: {
          description: true,
          id: true,
          title: true,
          status: true,
          issueType: true,
          storyPoints: true,
          assignee: { select: { name: true } },
          Epic: { select: { title: true, id: true } },
          childTasks: {
            include: {
              childTasks: true,
              assignee: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          issueType: "USERSTORY",
        },
      },
    },
  });
  return (
    <div>
      <KanbanBoard sprint={sprint} sprintId={sprintId} projectId={projectId} />
    </div>
  );
}

export default page;
