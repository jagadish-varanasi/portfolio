"use client";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import React, { FormEvent } from "react";
import Editor from "../components/editor";
import { createTask, getEpicDetails, getMembers, Task } from "@/app/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Button } from "@repo/ui/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@repo/ui/lib/utils";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Scrollbar } from "@radix-ui/react-scroll-area";

const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z.string(),
  status: z.string(),
  issueType: z.string(),
  label: z.string(),
  priority: z.string(),
  storyPoints: z.string().optional(),
  sprint: z.string().optional(),
  startDate: z
    .date({ required_error: "Start/End date cannot be empty" })
    .optional(),
  endDate: z.date({ required_error: "Start/End date cannot be empty" }),
  parentTaskId: z.string().optional(),
  epicId: z.string().optional(),
  projectId: z.string(),
  userId: z.string(),
  reporterId: z.string(),
  discussions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        date: z.string(),
        content: z.string(),
      })
    )
    .nonempty(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<TaskFormValues> = {
  title: "Hello world",
  description: '{"a":"a"}',
  userId: "clzldqhyg0005wrvctgcq0yj3",
  reporterId: "clzldqhyg0005wrvctgcq0yj3",
  label: "FEATURE",
  priority: "HIGH",
  status: "INPROGRESS",
  startDate: new Date(),
  endDate: new Date(),
  storyPoints: "10",
};

function CreateTask() {
  const params = useParams<{ projectId: string }>();
  const searchParams = useSearchParams();
  console.log(searchParams.get("epicId"));
  //members in project.
  const {
    data: members,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => await getMembers(params.projectId),
  });

  const {
    data: parentData,
    isPending: parentIsPending,
    isError: parentIsError,
    error: parentError,
  } = useQuery({
    queryKey: ["parentLink"],
    queryFn: async () => {
      const id = searchParams.get("epicId");
      return await getEpicDetails(id);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Task) => {
      console.log(data);
      return createTask(data);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      ...defaultValues,
      projectId: params.projectId,
      discussions: [
        {
          id: "kasajk",
          name: "Jagadish V",
          date: "Jul 12",
          content: '{"a":"a"}',
        },
        {
          id: "kasajk",
          name: "Jagadish V",
          date: "Jul 12",
          content: '{"a":"a"}',
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: "discussions",
    control: control,
  });

  console.log(errors, "pd");

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    console.log("Hello");
    console.log(values);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-8 border p-8 border-1 grid md:grid-cols-[1.1fr_1fr] gap-x-8 gap-y-4 items-start rounded-md">
          <div className="col-span-2 font-bold flex justify-between items-center border-b pb-6">
            <h2 className="text-xl font-bold tracking-tight">Create Task</h2>
            <div>
              <Button size="sm" className="px-6" type="submit">
                Save
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid items-center col-span-2 gap-2">
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                placeholder="Title of the task"
                className="resize-none"
                {...register("title")}
              />
            </div>
            <div className="grid gap-2">
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="issueType" className="text-left">
                  Issue type
                </Label>
                {!searchParams?.get("epicId") ? (
                  <Controller
                    {...register("issueType")}
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USERSTORY">User Story</SelectItem>
                          <SelectItem value="TASK">Task</SelectItem>
                          <SelectItem value="BUG">Bug</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : (
                  <Input
                    value={`User Story`}
                    {...register("issueType")}
                    readOnly
                  ></Input>
                )}
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="userId" className="text-left">
                  Assignee
                </Label>
                <Controller
                  control={control}
                  {...register("userId")}
                  render={({ field }) => (
                    <Select {...field}>
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
                  )}
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="reporterId" className="text-left">
                  Reporter
                </Label>
                <Controller
                  control={control}
                  {...register("reporterId")}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Reporter" />
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
                  )}
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="label" className="text-left">
                  Label
                </Label>
                <Controller
                  control={control}
                  {...register("label")}
                  render={({ field }) => (
                    <Select {...field}>
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
                  )}
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="priority" className="text-left">
                  Priority
                </Label>
                <Controller
                  control={control}
                  {...register("priority")}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="parentTaskId" className="text-left">
                  Parent Issue
                </Label>
                {Array.isArray(parentData) ? (
                  <Controller
                    control={control}
                    {...register("parentTaskId")}
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {parentData?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {`${item?.title} - #${item?.id.slice(-5)}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : (
                  <Input
                    readOnly
                    value={`${parentData?.title} - #${parentData?.id.slice(
                      -5
                    )}`}
                    {...register("parentTaskId")}
                  ></Input>
                )}
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="status" className="text-left">
                  Status
                </Label>
                <Controller
                  control={control}
                  {...register("status")}
                  render={({ field }) => (
                    <Select {...field}>
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
                  )}
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="storyPoints" className="text-left">
                  Story points
                </Label>
                <Input
                  placeholder="Provide story point"
                  type="number"
                  {...register("storyPoints")}
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="startDate" className="text-left">
                  Start date
                </Label>
                <Select {...register("startDate")}>
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
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="endDate" className="text-left">
                  End date
                </Label>
                <Select {...register("endDate")}>
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
          </div>
          <div className="grid items-start">
            <div className="grid gap-3 mt-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Controller
                control={control}
                {...register("description")}
                render={({ field }) => (
                  <Editor
                    label={"Description"}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid gap-3 items-start">
              <Label>Discussions</Label>
              <ScrollArea className="h-[340px] w-full">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 w-full">
                    <Avatar className="mt-1">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Controller
                        control={control}
                        name={`discussions.${index}`}
                        render={({ field }) => (
                          <Editor
                            label={"Discussions"}
                            data={{
                              id: field.value.id,
                              name: field.value.name,
                              date: field.value.date,
                            }}
                            value={field.value.content}
                            onChange={(data: any) =>
                              field.onChange({
                                id: field.value.id,
                                name: field.value.name,
                                date: field.value.date,
                                content: data,
                              })
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
                <Scrollbar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
