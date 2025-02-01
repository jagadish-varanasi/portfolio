import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "../../../user-nav";
import { taskSchema } from "./data/schema";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "@repo/ui/hooks/use-toast";
import { ToastAction } from "@repo/ui/components/toast";
import BackButton from "./components/back-button";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/dashboard/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const formSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  title: z.string().min(1, {
    message: "Title of task",
  }),
  description: z.string().min(1, { message: "Description of task" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  status: z.enum(["TODO", "INPROGRESS", "DONE"], { message: "Status of task" }),
});

export default async function TaskPage({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await auth();

  //tasks for project!
  const tasks = await prisma.task.findMany({
    where: {
      projectId: params.projectId,
    },
    include: {
      Epic: { select: { title: true } },
      assignee: { select: { email: true, id: true, name: true } },
      Sprint: { select: { name: true, release: { select: { name: true } } } },
    },
  });

  //console.log(tasks);

  //members in project.
  const members = await prisma.projectOnUsers.findMany({
    where: { projectId: params.projectId },
    select: { user: { select: { id: true, email: true } } },
  });

  async function createTask(formData: FormData): Promise<any> {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as "TODO" | "INPROGRESS" | "DONE";
    const label = formData.get("issueType") as string;
    const assignee = formData.get("assignee") as string;
    console.log(session, "session");

    console.log({
      title: title,
      description: description,
      status: status,
      label: label,
      priority: priority,
      userId: assignee,
    });

    if (!session?.user?.id) {
      return {};
    }

    try {
      await prisma.task.create({
        data: {
          title: title,
          description: description,
          status: status,
          issueType: "TASK",
          priority: priority,
          userId: assignee,
          projectId: params.projectId,
          label: label,
          startDate: new Date().toString(),
          endDate: new Date().toString(),
          storyPoints: 10,
        },
      });
      console.log("DONE");
      toast({
        title: "Your changes are saved!",
        description: "Your task created successfully.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    // mutate data
    // revalidate cache
    revalidatePath("/dashboard");
  }

  return (
    <>
      <Sheet>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <div className="flex items-center">
                <BackButton />
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back!
                </h2>
              </div>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
        <SheetContent className="xl:w-[500px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
          <form action={createTask}>
            <SheetHeader>
              <SheetTitle>Create Task</SheetTitle>
              <SheetDescription>
                {` Enter task details. Click save when you're done.`}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Assignee
                </Label>
                <div className="col-span-3">
                  <Select name="assignee">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {members?.map((member) => (
                        <SelectItem
                          value={member?.user?.id}
                          key={member.user?.email}
                        >
                          {member?.user?.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issueType" className="text-right">
                  Label
                </Label>
                <div className="col-span-3">
                  <Select name="issueType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Label" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOCUMENTATION">
                        Documentation
                      </SelectItem>
                      <SelectItem value="FEATURE">Feature</SelectItem>
                      <SelectItem value="BUG">Bug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <div className="col-span-3">
                  <Textarea
                    placeholder="Title of the task"
                    className="resize-none"
                    name="title"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <div className="col-span-3">
                  <Select name="priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3">
                  <Select name="status">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TODO">Todo</SelectItem>
                      <SelectItem value="INPROGRESS">In Progress</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                      <SelectItem value="BACKLOG">Backlog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <div className="col-span-3">
                  <Textarea
                    placeholder="Description of the task"
                    className="resize-none"
                    name="description"
                    rows={5}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Create Task</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
