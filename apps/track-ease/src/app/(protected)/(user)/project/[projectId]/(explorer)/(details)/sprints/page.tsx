import React from "react";
import { AllSprints } from "./components/all-sprints";
import { Button } from "@repo/ui/components/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import SprintForm from "./components/sprint-form";
import prisma from "@/lib/db";
import SheetWrapper from "./components/sheet-wrapper";
import Link from "next/link";
import { Metadata } from "next";
import { AllUpcomingSprint } from "./components/all-upcoming-sprints";
import { AllCompletedSprint } from "./components/all-completed-sprint";

export const metadata: Metadata = {
  title: "Sprints",
  description: "Sprints Home Page",
};

async function Page({
  params: { projectId },
  searchParams,
}: {
  params: {
    projectId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const current = await prisma.sprint.findMany({
    where: {
      projectId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
    include: { release: { select: { name: true } } },
  });


  const upcoming = await prisma.sprint.findMany({
    where: { projectId, startDate: { gt: new Date() } },
    include: {
      release: { select: { name: true } },
      tasks: {
        select: {
          status: true,
          title: true,
          id: true,
          childTasks: { select: { title: true, id: true, status: true } },
          Epic: { select: { title: true, id: true } },
        },
        where: { issueType: "USERSTORY" },
      },
    },
  });

  const completed = await prisma.sprint.findMany({
    where: { projectId, endDate: { lt: new Date() } },
    include: {
      release: { select: { name: true } },
      tasks: { select: { status: true } },
    },
  });

  console.log("SPRINTS");

  const isSprintEditFlow = searchParams?.sprintId as string;
  const openedTab = (searchParams?.tab as string) || "current";
  let sprint = null;
  if (isSprintEditFlow) {
    const sprintEdit = await prisma.sprint.findUnique({
      where: { id: isSprintEditFlow },
      include: { tasks: { where: { issueType: "USERSTORY" } } },
    });
    sprint = {
      ...sprintEdit,
      sprintDuration: {
        from: sprintEdit?.startDate,
        to: sprintEdit?.endDate,
      },
      tasks: sprintEdit?.tasks?.map((d) => ({
        value: d.id,
        label: d.title,
      })),
      sprintId: sprintEdit?.id,
    };
  }
  console.log(isSprintEditFlow, sprint, "sDID");

  return (
    <SheetWrapper projectId={projectId}>
      <Tabs value={openedTab} className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            {["current", "upcoming", "completed"].map((tab, index) => (
              <Link href={`?tab=${tab}`} key={index}>
                <TabsTrigger value={tab} className="capitalize">
                  {tab}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
          <div className="ml-auto">
            <Link href={`?tab=${openedTab}&create=true`}>
              <Button className="ml-auto h-9" variant="outline">
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Create
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="current">
          <AllSprints
            data={current}
            type="current"
            projectId={projectId}
            openedTab=""
          />
        </TabsContent>
        <TabsContent value="upcoming">
          <AllUpcomingSprint
            data={upcoming}
            type="upcoming"
            projectId={projectId}
          />
        </TabsContent>
        <TabsContent value="completed">
          <AllCompletedSprint
            data={completed}
            type="completed"
            projectId={projectId}
          />
        </TabsContent>
      </Tabs>
      <SprintForm projectId={projectId} sprint={sprint as any} />
    </SheetWrapper>
  );
}

export default Page;
