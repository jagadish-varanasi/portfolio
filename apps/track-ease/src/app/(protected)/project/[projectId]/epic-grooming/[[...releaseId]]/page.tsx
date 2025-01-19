import { Metadata } from "next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/hover-card";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";
import { MaxLengthSelector } from "./components/maxlength-selector";
import { ModelSelector } from "./components/model-selector";
import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
import { PresetShare } from "./components/preset-share";
import { TemperatureSelector } from "./components/temperature-selector";
import { TopPSelector } from "./components/top-p-selector";
import { models, types } from "./data/models";
import { presets } from "./data/presets";
import prisma from "@/lib/db";
import CreateEpic from "./components/create-epic";
import { Icons } from "@repo/ui/components/icons";
import EditorTab from "./components/editor-tab";
import EditorActions from "./components/editor-action";
import CollaborationContextProvider from "@/context/CollaborationContext";
import PreviewTab from "./components/preview-tab";
import Link from "next/link";
import Info from "./components/info";
import { Badge } from "@repo/ui/components/badge";

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

export default async function ReleaseBoardPage({
  params: { releaseId, projectId },
  searchParams,
}: {
  params: { releaseId: string; projectId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const type = (searchParams?.type as string) || "groom";
  let highLevelRequirements =
    type === "groom" && releaseId?.[0]
      ? (
          await prisma.initiation.findUnique({
            where: { id: releaseId?.[0] },
            include: { highLevelRequirements: true },
          })
        )?.highLevelRequirements
      : await prisma.highLevelRequirement.findMany({});

  const existingData =
    type === "edit" &&
    (await prisma.epicDraft.findUnique({
      where: { id: releaseId?.[0] },
      include: { highLevelRequirements: true },
    }));

  if (typeof existingData !== "boolean" && existingData?.initiationId) {
    highLevelRequirements = (
      await prisma.initiation.findUnique({
        where: { id: existingData?.initiationId },
        select: { highLevelRequirements: true },
      })
    )?.highLevelRequirements;
  }

  const openedTab = (searchParams?.tab as string) || "create";

  return (
    <CollaborationContextProvider
      releaseId={releaseId}
      release={""}
      projectId={projectId}
    >
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">EpicBoard</h2>
          <Badge className="ml-2 bg-orange-500 text-xs">
            {type || "create"}
          </Badge>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            {openedTab === "preview" && (
              <PresetSave
                label="Save"
                projectId={projectId}
                releaseId={releaseId}
              />
            )}
            {["editor", "create"].includes(openedTab) && (
              <PresetSave
                label="Save draft"
                projectId={projectId}
                releaseId={releaseId}
              />
            )}
            <div className="hidden space-x-2 md:flex">
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs value={openedTab} className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Flow
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the interface that best suits your task. You can
                      provide: a simple prompt to complete, starting and ending
                      text to insert a completion within, or some text with
                      instructions to edit it.
                    </HoverCardContent>
                  </HoverCard>
                  <TabsList className="grid grid-cols-3">
                    <Link href={`?type=${type}&tab=create`}>
                      <TabsTrigger value="create">
                        <span className="sr-only">Create</span>
                        <Icons.menu />
                      </TabsTrigger>
                    </Link>
                    <Link href={`?type=${type}&tab=editor`}>
                      <TabsTrigger value="editor">
                        <span className="sr-only">Analyze</span>
                        <Icons.edit />
                      </TabsTrigger>
                    </Link>
                    <Link href={`?type=${type}&tab=preview`}>
                      <TabsTrigger value="preview">
                        <span className="sr-only">Preview</span>
                        <Icons.complete />
                      </TabsTrigger>
                    </Link>
                  </TabsList>
                </div>
                {openedTab === "create" && <Info />}
                {openedTab === "editor" && <EditorActions />}
              </div>
              <div className="md:order-1">
                <TabsContent value="create" className="mt-0 border-0 p-0">
                  <CreateEpic
                    highLevelRequirements={highLevelRequirements}
                    data={existingData}
                    projectId={projectId}
                    type={type}
                  />
                </TabsContent>
                <TabsContent value="editor" className="mt-0 border-0 p-0">
                  <EditorTab />
                </TabsContent>
                <TabsContent value="preview" className="mt-0 border-0 p-0">
                  <PreviewTab />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </CollaborationContextProvider>
  );
}
