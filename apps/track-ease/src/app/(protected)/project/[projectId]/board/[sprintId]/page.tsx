import React from "react";
import prisma from "@/lib/db";
import { Metadata } from "next";
import KanbanBoard from "./components/kanban-board";

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
      release: { select: { name: true, id: true } },
      tasks: {
        select: {
          description: true,
          id: true,
          title: true,
          status: true,
          issueType: true,
          Epic: { select: { title: true } },
          childTasks: {
            include: {
              childTasks: true,
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
      <KanbanBoard sprint={sprint} />
    </div>
  );
}

export default page;
