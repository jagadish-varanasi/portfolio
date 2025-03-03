"use client";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import React, { useState, useEffect } from "react";
import Editor from "../components/editor";
import {
  createTask,
  getEpicDetails,
  getMembers,
  getSprintDetails,
  getTaskData,
  getUserStoriesForSprint,
  Task,
} from "@/app/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams, useRouter } from "next/navigation";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { ArrowLeft, CalendarIcon, Delete, Trash2Icon } from "lucide-react";
import { Calendar } from "@repo/ui/components/calendar";
import { format } from "date-fns";
import { toast } from "@repo/ui/hooks/use-toast";
import { ToastAction } from "@repo/ui/components/toast";
import { Badge } from "@repo/ui/components/badge";
import BackButton from "../../components/back-button";
import { taskFormSchema } from "./types/tasks";
import {
  FormField,
  FormControl,
  FormMessage,
  Form,
  FormItem,
  FormLabel,
} from "@repo/ui/components/form";
import Loading from "./loading";

export type TaskFormValues = z.infer<typeof taskFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<TaskFormValues> = {
  title: "",
  description: '{"a":"a"}',
  status: "TODO",
  issueType: "TASK",
};

const transformNullToUndefined = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  );
};

const issueTypes = [
  { value: "USERSTORY", label: "User Story" },
  { value: "TASK", label: "Task" },
];

function CreateTask() {
  const params = useParams<{ projectId: string }>();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  const {
    data: members,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => await getMembers(params.projectId),
  });

  const sprintType = searchParams.get("sprintId") && "SPRINT";
  const epicType = searchParams.get("epicId") && "EPIC";
  const taskType = searchParams.get("taskId") && "TASK";
  const initiationType = searchParams.get("initiation") && "INITIATION";

  const {
    data: parentData,
    isPending: parentIsPending,
    isError: parentIsError,
    error: parentError,
  } = useQuery({
    queryKey: ["parentLink"],
    queryFn: async () => {
      const id = searchParams.get("epicId");
      const sprintId = searchParams.get("sprintId");
      return await getEpicDetails(params.projectId, id, sprintId);
    },
  });

  const {
    data: taskData,
    isPending: taskDataIsPending,
    isError: taskDataIsError,
    error: taskDataError,
  } = useQuery({
    queryKey: ["taskData", searchParams.get("taskId")],
    queryFn: async () => {
      const taskId = searchParams.get("taskId");
      if (taskType && taskId) {
        const data = await getTaskData(+taskId);
        console.log(data, "TASK");
        return data;
      }
    },
  });

  const {
    data: parentUserStoriesData,
    isPending: parentUserStoriesPending,
    isError: parentUserStoriesIsError,
    error: parentUserStoriesError,
  } = useQuery({
    queryKey: ["parentUserStoriesLink"],
    queryFn: async () => {
      const sprintId = searchParams.get("sprintId");
      const data = await getUserStoriesForSprint(sprintId);
      console.log(data);
      return data;
    },
  });

  const {
    data: sprintData,
    isPending: sprintIsPending,
    isError: sprintIsError,
    error: sprintError,
  } = useQuery({
    queryKey: ["sprintLink"],
    queryFn: async () => {
      const id = searchParams.get("sprintId");
      if (id) {
        return await getSprintDetails(id);
      }
      return { name: "" };
    },
  });

  console.log(taskData, "task");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...defaultValues,
      projectId: params.projectId,
      discussions: [
        {
          content: '{"a":"a"}',
        },
        {
          content: '{"a":"a"}',
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    resetField,
    setValue,
    watch,
    getValues,
  } = form;

  const watchIssueType = watch("issueType", "TASK");

  const { fields, append, remove, update } = useFieldArray({
    name: "discussions",
    control: control,
  });

  const goToTasks = () => {
    if (sprintType) {
      router.push(
        `/project/${params.projectId}/board/${searchParams.get("sprintId")}`
      );
      router.refresh();
      return;
    }
    if (taskType) {
      router.push(`/project/${params.projectId}/board/${taskData?.sprintId}`);
      router.refresh();
      return;
    }
    router.push(`/project/${params.projectId}/tasks`);
    router.refresh();
  };

  const mutation = useMutation({
    mutationFn: async (newTask: z.infer<typeof taskFormSchema>) => {
      const taskId = searchParams.get("taskId");
      const response = await fetch("/api/v1/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...newTask,
          ...(searchParams.get("epicId") && {
            epicId: searchParams.get("epicId"),
          }),
          ...(taskId && {
            id: +taskId,
          }),
          ...(searchParams.get("sprintId") && {
            sprintId: searchParams.get("sprintId"),
          }),
        }),
      });
      const json = await response.json();
      return json;
    },
    onSuccess(data) {
      toast({
        title: "Your changes are saved!",
        description: "Your task created successfully.",
        action: (
          <ToastAction altText="Go to tasks" onClick={goToTasks}>
            {sprintType || taskType ? "Go to board" : "Go to tasks"}
          </ToastAction>
        ),
      });
      if (taskType) {
        queryClient.setQueryData(
          ["taskData", searchParams.get("taskId")],
          data
        );
        queryClient.invalidateQueries({
          queryKey: ["my-tasks", data?.epicId, data?.projectId],
        });
      }
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      const taskId = searchParams.get("taskId");
      if (taskId) {
        return fetch(`/api/v1/tasks?taskId=${taskId}`, {
          method: "DELETE",
        });
      }
      throw Error("No taskId");
    },
    onSuccess() {
      toast({
        title: "Your task is deleted!",
        description: "Deletion successfully.",
      });
      goToTasks();
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  useEffect(() => {
    if (taskData && parentUserStoriesData && taskType) {
      const taskSet = {
        projectId: params.projectId,
        discussions: [{ content: "" }],
        ...transformNullToUndefined({
          ...taskData,
          storyPoints: taskData.storyPoints?.toString(),
          parentTaskId: taskData.parentTaskId?.toString(),
        }),
      };
      reset(taskSet);
      setIsDone(true);
    }
  }, [taskData, reset, params.projectId, parentUserStoriesData, taskType]);

  useEffect(() => {
    if (initiationType) {
      setValue("issueType", "USERSTORY");
    }
  }, [initiationType, setValue]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        title: "",
        issueType: "",
        parentTaskId: "",
        reporterId: "",
        userId: "",
        label: "",
        status: "",
        priority: "",
        startDate: undefined,
        endDate: undefined,
        storyPoints: "",
      });
    }
  }, [formState, reset]);

  console.log(watchIssueType, "watchIssueType");

  if (
    isPending ||
    parentIsPending ||
    sprintIsPending ||
    taskDataIsPending ||
    parentUserStoriesPending
  ) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    console.log(values);
    mutation.mutate(values);
  }
  console.log(getValues(), formState, formState.errors, "VALUES");

  return (
    <div>
      <Form {...form}>
        <form key={isDone ? 0 : 1} onSubmit={handleSubmit(onSubmit)}>
          <div className="m-8 border p-8 border-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start rounded-md">
            <div className="md:col-span-2 font-bold flex flex-col gap-4 md:gap-0 md:flex-row justify-center md:justify-between items-center border-b pb-6">
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:justify-start">
                <BackButton />
                <h2 className="text-xl font-bold tracking-tight">
                  Create Task
                </h2>
                {sprintType ? (
                  <Badge>{`Adding task to ${sprintData?.name}`} </Badge>
                ) : epicType ? (
                  <Badge>{`Adding User Story to ${(parentData as any)?.title} epic`}</Badge>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center gap-2">
                {taskType && (
                  <Button
                    size="icon"
                    className="px-6"
                    variant="secondary"
                    type="button"
                    onClick={() => deleteMutation.mutate()}
                  >
                    <Trash2Icon />
                  </Button>
                )}
                <Button
                  size="sm"
                  className="px-6"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title of the task"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue type</FormLabel>
                    <FormControl>
                      {!epicType ? (
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {issueTypes.map((issueType) => (
                              <SelectItem
                                key={issueType.value}
                                value={issueType.value}
                              >
                                {issueType.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...field} value={`USERSTORY`} readOnly />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchIssueType === "TASK" && !epicType && (
                <FormField
                  control={form.control}
                  name="parentTaskId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Issue</FormLabel>
                      <FormControl>
                        <div>
                          {Array.isArray(parentUserStoriesData) && (
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value?.toString()}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Parent" />
                              </SelectTrigger>
                              <SelectContent>
                                {parentUserStoriesData?.map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                  >
                                    {`${item?.title} - #${item?.id}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {(watchIssueType === "USERSTORY" || watchIssueType === "") && (
                <FormField
                  control={form.control}
                  name="epicId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Issue</FormLabel>
                      <FormControl>
                        <div>
                          {Array.isArray(parentData) && (
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Parent" />
                              </SelectTrigger>
                              <SelectContent>
                                {parentData?.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {`${item?.title} - #${item?.id}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          {!Array.isArray(parentData) && epicType && (
                            <Input
                              {...field}
                              readOnly
                              value={`${parentData?.title} - #${parentData?.id.slice(-5)}`}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reporterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reporter</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TODO" key="TODO">
                            Todo
                          </SelectItem>
                          <SelectItem value="INPROGRESS" key="INPROGRESS">
                            In Progress
                          </SelectItem>
                          <SelectItem value="DONE" key="DONE">
                            Done
                          </SelectItem>
                          <SelectItem value="BACKLOG" key="BACKLOG">
                            Backlog
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="LOW">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal gap-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storyPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story points</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Provide story point"
                        type="number"
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal gap-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 grid items-start">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor
                        label={"Description"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discussions"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Discussions</FormLabel>
                    <FormControl>
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
                                      id: new Date().toString(),
                                      name: "Jagadish V",
                                      date: new Date().toString(),
                                    }}
                                    value={field.value.content}
                                    onChange={(data: any) =>
                                      field.onChange({
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateTask;
