import React from "react";
import { AllSprints } from "./components/all-sprints";
import { Separator } from "@repo/ui/components/separator";
import { Button } from "@repo/ui/components/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Sheet, SheetTrigger } from "@repo/ui/components/sheet";
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
      tasks: { select: { status: true } },
    },
  });
  const upcoming = await prisma.sprint.findMany({
    where: { projectId, startDate: { gt: new Date() } },
    include: {
      release: { select: { name: true } },
      tasks: { select: { status: true } },
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
              <AllSprints data={current} type="current" projectId={projectId} />
            </TabsContent>
            <TabsContent value="upcoming">
              <AllSprints
                data={upcoming}
                type="upcoming"
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="completed">
              <AllSprints
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
