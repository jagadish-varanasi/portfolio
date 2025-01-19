import prisma from "@/lib/db";
import React from "react";

async function Page({
  params: { projectId },
  searchParams,
}: {
  params: {
    projectId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const projectDetails = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      ProjectOnUsers: { include: { user: true } },
      Epic: { include: { tasks: true } ,},
    },
  });
  const tasksCount = await prisma.task.aggregate({
    where: { projectId: projectId },
    _count: true,
  });
  const epicsCount = await prisma.epic.aggregate({
    where: { projectId: projectId },
    _count: true,
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Vision:</h2>
      <p>{projectDetails?.description}</p>
      <h2 className="text-lg font-semibold">Owner:</h2>
      {projectDetails?.ProjectOnUsers.filter((a) => a.role === "OWNER").map(
        (a) => <p key={a.userId}>{a.user.name}</p>
      )}
      <h2 className="text-lg font-semibold">Members:</h2>
      {projectDetails?.ProjectOnUsers.filter((a) => a.role === "MEMBER").map(
        (a) => <p key={a.userId}>{a.user.name}</p>
      )}
      <h2 className="text-lg font-semibold">Epic count:</h2>
      <p>{epicsCount._count}</p>
      <h2 className="text-lg font-semibold">Tasks count:</h2>
      <p>{tasksCount._count}</p>
    </div>
  );
}

export default Page;
