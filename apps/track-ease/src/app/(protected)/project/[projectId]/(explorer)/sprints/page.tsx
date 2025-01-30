import React from "react";
import { AllSprints } from "./components/all-sprints";
import { Separator } from "@repo/ui/components/separator";
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
import { z } from "zod";
import { AllUpcomingSprint } from "./components/all-upcoming-sprints";
import { AllCompletedSprint } from "./components/all-completed-sprint";

type Status = "TODO" | "INPROGRESS" | "DONE";

interface ChildTask {
  title: string;
  id: number;
  status: Status;
}

interface Task {
  title: string;
  id: number;
  status: Status;
  childTasks: Array<ChildTask>;
  Epic: { title: string; id: string } | null;
}

interface GroupedTask {
  parentTask: Task;
  childTasks: ChildTask[];
}

interface GroupedTasksByStatus {
  TODO: ChildTask[];
  INPROGRESS: ChildTask[];
  DONE: ChildTask[];
}

interface GroupedTasksByParent {
  TODO: GroupedTask[];
  INPROGRESS: GroupedTask[];
  DONE: GroupedTask[];
}

export interface Sprint {
  id: string;
  isDone: boolean;
  name: string;
  projectId: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  release: {
    name: string;
  };
  tasks: Array<{
    status: Status;
    title: string;
    id: number;
    Epic: { title: string; id: string } | null;
    childTasks: Array<{ title: string; id: number; status: Status }>;
  }>;
}

export interface FormattedSprint {
  id: string;
  isDone: boolean;
  name: string;
  projectId: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  release: {
    name: string;
  };
  tasks: GroupedTasksByParent;
}

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
    include: {
      release: { select: { name: true } },
      tasks: {
        select: {
          status: true,
          title: true,
          id: true,
          Epic: { select: { title: true, id: true } },
          childTasks: { select: { title: true, id: true, status: true } },
        },
        where: {
          issueType: "USERSTORY",
        },
      },
    },
  });

  console.log(current, "CURRENT");

  function groupTasksByStatus(
    tasks: Array<{
      title: string;
      id: number;
      status: Status;
      childTasks: Array<{
        title: string;
        id: number;
        status: Status;
      }>;
      Epic: { title: string; id: string } | null;
    }>
  ) {
    const groupedTasks: GroupedTasksByParent = {
      TODO: [],
      INPROGRESS: [],
      DONE: [],
    };
    tasks.forEach((task) => {
      const childTasksByStatus: GroupedTasksByStatus = {
        TODO: [],
        INPROGRESS: [],
        DONE: [],
      };

      task.childTasks?.forEach((childTask) => {
        if (childTasksByStatus[childTask.status]) {
          childTasksByStatus[childTask.status].push(childTask);
        }
      });

      Object.keys(childTasksByStatus).forEach((status) => {
        if (childTasksByStatus[status as Status].length > 0) {
          groupedTasks[status as Status].push({
            parentTask: task,
            childTasks: childTasksByStatus[status as Status],
          });
        }
      });
    });

    return groupedTasks;
  }

  function groupBySprint(sprints: Array<Sprint>) {
    return sprints.map((sprint) => ({
      ...sprint,
      tasks: groupTasksByStatus(sprint.tasks),
    }));
  }

  const formattedSprint = groupBySprint(current);

  console.log(JSON.stringify(formattedSprint), "GROUP_TASKS");

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
      include: { tasks: true },
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
      <div className="flex w-full gap-4 h-full">
        <div className="w-[50%]">
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
                  <Button className="ml-auto h-9 mr-4" variant="outline">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Create
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="current">
              <AllSprints
                data={formattedSprint}
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
        </div>
        <Separator orientation="vertical" className="mx-3" />
        <div className="w-[50%] space-x-2">
          <h5 className="text-lg font-semibold tracking-tight">Details</h5>
        </div>
      </div>
      <SprintForm projectId={projectId} sprint={sprint as any} />
    </SheetWrapper>
  );
}

export default Page;
