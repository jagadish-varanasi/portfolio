import React from "react";
import { AllReleases } from "./components/all-releases";
import { Separator } from "@repo/ui/components/separator";
import { Button } from "@repo/ui/components/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Releases",
  description: "Releases Home Page",
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
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  });
  const upcoming = await prisma.release.findMany({
    where: {
      projectId,
      startDate: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  });
  const completed = await prisma.release.findMany({
    where: {
      projectId,
      endDate: {
        lt: new Date(),
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  });
  const drafts = await prisma.releaseDraft.findMany({
    where: { projectId },
  });

  const isDraftFlow = searchParams?.draftId as string;
  const isReleaseEditFlow = searchParams?.releaseId as string;
  const openedTab = (searchParams?.tab as string) || "current";
  let draft = null;
  let releaseEdit = null;
  if (isDraftFlow) {
    const draftRelease = await prisma.releaseDraft.findUnique({
      where: { id: isDraftFlow },
      include: { EpicOnReleaseDraft: { include: { epic: true } } },
    });
    draft = {
      ...draftRelease,
      duration: {
        from: draftRelease?.startDate,
        to: draftRelease?.endDate,
      },
      epics: draftRelease?.EpicOnReleaseDraft.map((d) => ({
        value: d.epic.id,
        label: d.epic.title,
      })),
    };
  }

  if (isReleaseEditFlow) {
    const draftRelease = await prisma.release.findUnique({
      where: { id: isReleaseEditFlow },
      include: { EpicOnReleases: { include: { epic: true } } },
    });
    releaseEdit = {
      ...draftRelease,
      duration: {
        from: draftRelease?.startDate,
        to: draftRelease?.endDate,
      },
      epics: draftRelease?.EpicOnReleases?.map((d) => ({
        value: d.epic.id,
        label: d.epic.title,
      })),
    };
  }

  return (
    <SheetWrapper projectId={projectId}>
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
                <PlusCircledIcon className="h-4 w-4" />
                Create
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="current">
          <AllReleases data={current} type="current" projectId={projectId} />
        </TabsContent>
        <TabsContent value="upcoming">
          <AllReleases data={upcoming} type="upcoming" projectId={projectId} />
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
      <ReleaseForm
        projectId={projectId}
        draft={draft as any}
        release={releaseEdit as any}
      />
    </SheetWrapper>
  );
}

export default Page;
