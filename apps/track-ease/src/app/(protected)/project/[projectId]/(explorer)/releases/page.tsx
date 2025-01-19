import React from "react";
import { AllReleases } from "./components/all-releases";
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
import ReleaseForm from "./components/release-form";
import prisma from "@/lib/db";
import SheetWrapper from "./components/sheet-wrapper";
import Link from "next/link";

async function Page({
  params: { projectId },
  searchParams,
}: {
  params: {
    projectId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const current = await prisma.release.findMany({
    where: {
      projectId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
    include: { sprints: true, epics: true },
  });
  const upcoming = await prisma.release.findMany({
    where: {
      projectId,
      startDate: {
        gt: new Date(),
      },
    },
    include: { sprints: true, epics: true },
  });
  const completed = await prisma.release.findMany({
    where: {
      projectId,
      endDate: {
        lt: new Date(),
      },
    },
    include: { sprints: true, epics: true },
  });
  const drafts = await prisma.releaseDraft.findMany({
    where: { projectId },
  });

  const isDraftFlow = searchParams?.draftId as string;
  const openedTab = (searchParams?.tab as string) || "current";
  let draft = null;
  if (isDraftFlow) {
    draft = await prisma.releaseDraft.findUnique({
      where: { id: isDraftFlow },
      select: {
        description: true,
        name: true,
        id: true,
      },
    });
  }
  console.log(isDraftFlow, draft, "sDID");
  return (
    <SheetWrapper projectId={projectId}>
      <div className="flex w-full gap-4 h-full">
        <div className="w-[50%]">
          <Tabs value={openedTab} className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                {["current", "upcoming", "completed", "saved", "drafts"].map(
                  (tab, index) => (
                    <Link href={`?tab=${tab}`} key={index}>
                      <TabsTrigger value={tab} className="capitalize">
                        {tab}
                      </TabsTrigger>
                    </Link>
                  )
                )}
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
              <AllReleases
                data={current}
                type="current"
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="upcoming">
              <AllReleases
                data={upcoming}
                type="upcoming"
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="completed">
              <AllReleases
                data={completed}
                type="completed"
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="drafts">
              <AllReleases data={drafts} type="drafts" projectId={projectId} />
            </TabsContent>
          </Tabs>
        </div>
        <Separator orientation="vertical" className="mx-3" />
        <div className="w-[50%] space-x-2">
          <h5 className="text-lg font-semibold tracking-tight">Details</h5>
        </div>
      </div>
      <ReleaseForm projectId={projectId} draft={draft as any} />
    </SheetWrapper>
  );
}

export default Page;
