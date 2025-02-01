"use client";

import { useReducer, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { MoveLeft, Plus, ZapIcon, ArrowLeft } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { HoverBorderGradient } from "@repo/ui/components/hover-board-gradient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Badge } from "@repo/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { boardReducer } from "./reducer";
import { Droppable } from "./droppable";
import { TaskCard } from "./task-card";
import { ParentTaskCard } from "./parent-task-card";
import type {
  Board,
  ParentTask,
  ChildTask,
  DevStatus,
  TaskStatus,
} from "./types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { taskFormSchema } from "../../../tasks/create/[[...ids]]/page";
import BackButton from "../../../tasks/components/back-button";
import { parentPort } from "worker_threads";

const initialBoard: Board = {
  parentTasks: [
    {
      id: "task-1",
      content: "Design System",
      status: "INPROGRESS",
      epic: "UI Modernization",
      devStatus: "pending",
      epicId: "epic-1",
      assignee: "John Doe", // New property
      storyPoints: 8, // New property
      children: [
        {
          id: "child-1",
          content: "Color Palette",
          parentId: "task-1",
          status: "DONE",
          assignee: "Jane Smith", // New property
          storyPoints: 3, // New property
        },
        {
          id: "child-2",
          content: "Typography",
          parentId: "task-1",
          status: "INPROGRESS",
          assignee: "Emily Johnson", // New property
          storyPoints: 5, // New property
        },
      ],
    },
    {
      id: "task-2",
      content: "User Authentication",
      status: "TODO",
      epic: "Security",
      epicId: "aaa",
      devStatus: "pending",
      assignee: "Michael Brown", // New property
      storyPoints: 13, // New property
      children: [
        {
          id: "child-3",
          content: "Login Page",
          parentId: "task-2",
          status: "TODO",
          assignee: "Chris Green", // New property
          storyPoints: 5, // New property
        },
        {
          id: "child-4",
          content: "Sign Up Flow",
          parentId: "task-2",
          status: "TODO",
          assignee: "Alex White", // New property
          storyPoints: 8, // New property
        },
      ],
    },
    {
      id: "task-3",
      content: "Project Setup",
      status: "DONE",
      epic: "Infrastructure",
      epicId: "aaa",
      devStatus: "prodReady",
      assignee: "Sarah Black", // New property
      storyPoints: 5, // New property
      children: [
        {
          id: "child-5",
          content: "Repository Creation",
          parentId: "task-3",
          status: "DONE",
          assignee: "David Blue", // New property
          storyPoints: 2, // New property
        },
        {
          id: "child-6",
          content: "Dependencies Installation",
          parentId: "task-3",
          status: "DONE",
          assignee: "Laura Red", // New property
          storyPoints: 3, // New property
        },
      ],
    },
  ],
  columns: {
    TODO: {
      id: "TODO",
      title: "To Do",
      childTasks: [],
    },
    INPROGRESS: {
      id: "INPROGRESS",
      title: "In Progress",
      childTasks: [],
    },
    DONE: {
      id: "DONE",
      title: "Done",
      childTasks: [],
    },
  },
};

const devStatusConfig = {
  pending: { label: "Pending", color: "secondary" },
  devComplete: { label: "Dev Complete", color: "blue" },
  qaComplete: { label: "QA Complete", color: "yellow" },
  prodReady: { label: "Prod Ready", color: "green" },
} as const;

function getInitialData(initial: any, sprint: any) {
  const parentTasks = sprint.tasks.map((sp: any) => ({
    id: sp.id,
    content: sp.title,
    status: sp.status,
    epic: sp.Epic?.title,
    epicId: sp.Epic?.id,
    devStatus: "pending",
    assignee: sp.assignee?.name,
    storyPoints: sp.storyPoints,
    children: sp.childTasks.map((t: any) => ({
      id: t.id,
      content: t.title,
      parentId: sp.id,
      status: t.status,
      assignee: sp.assignee?.name,
      storyPoints: sp.storyPoints,
    })),
  }));
  return { ...initial, parentTasks };
}

export default function KanbanBoard({ sprint, sprintId, projectId }) {
  console.log(sprint);
  const [board, dispatch] = useReducer(
    boardReducer,
    initialBoard,
    (initial) => {
      const data: Board = getInitialData(initial, sprint);
      const initialized = structuredClone(data);
      Object.values(initialized.columns).forEach((column) => {
        column.childTasks = [];
      });
      initialized.parentTasks.forEach((parent) => {
        parent.children.forEach((child) => {
          initialized.columns[child.status].childTasks.push(child);
        });
      });
      return initialized;
    }
  );
  const [selectedTask, setSelectedTask] = useState<ParentTask | null>(null);
  const [newChildTask, setNewChildTask] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newColumnName, setNewColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (task: {
      id: number;
      status: string;
      parentId?: string | null;
      parentStatus?: string | null;
    }) => {
      console.log("CHANGE TASK", task);
      await fetch("/api/v1/tasks/update-status", {
        method: "POST",
        body: JSON.stringify({
          status: task.status,
          id: task.id,
        }),
      });
      return { parentStatus: task.parentStatus, parentId: task.parentId };
    },
    onSuccess(data) {
      if (!data.parentId || !data.parentStatus) return;

      const pTask = board.parentTasks.find(
        (task) => task.id === data?.parentId
      );

      if (pTask?.children.every((p) => p.status === "DONE")) {
        if (data?.parentId && data?.parentStatus)
          mutation.mutate({
            id: +data?.parentId,
            status: "DONE",
            parentId: null,
            parentStatus: null,
          });
      } else if (
        data?.parentStatus !== "INPROGRESS" &&
        pTask?.children.some(
          (p) => p.status === "DONE" || p.status === "INPROGRESS"
        )
      ) {
        if (pTask.id)
          mutation.mutate({
            id: +data?.parentId,
            status: "INPROGRESS",
            parentId: null,
            parentStatus: null,
          });
      } else if (
        data?.parentStatus !== "TODO" &&
        pTask?.children.every((p) => p.status === "TODO")
      ) {
        if (pTask.id)
          mutation.mutate({
            id: +data?.parentId,
            status: "DONE",
            parentId: null,
            parentStatus: null,
          });
      }
    },
    onError(error, variables, context) {},
  });

  const taskMutation = useMutation({
    mutationFn: async (newTask: {
      parentTaskId: string;
      title: string;
      status: string;
      projectId: string;
      discussions: Array<{ content: string }>;
      issueType: string;
      sprintId: string;
      epicId: string;
    }) => {
      const response = await fetch("/api/v1/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      return data;
    },
    onSuccess(data) {
      console.log(data, "Hello");
      dispatch({
        type: "ADD_CHILD_TASK",
        parentId: data.parentTaskId,
        content: data.title,
        id: data.id,
      });
    },
    onError(error, variables, context) {},
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeData = active.data.current as {
      task: ChildTask;
      status: TaskStatus;
    };
    if (!activeData) return;

    const sourceStatus = activeData.status;
    const destinationStatus = over.id as TaskStatus;

    const parentTask = board.parentTasks.find((p) =>
      p.children.some((c) => c.id === active.id)
    );

    if (sourceStatus === destinationStatus) return;

    mutation.mutate({
      id: +active.id,
      status: destinationStatus,
      parentId: parentTask?.id,
      parentStatus: parentTask?.status,
    });

    const initialStatus = parentTask?.status;
    dispatch({
      type: "MOVE_TASK",
      source: sourceStatus,
      destination: destinationStatus,
      taskId: active.id as string,
    });
  };

  const handleDevStatusChange = (taskId: string, status: DevStatus) => {
    dispatch({
      type: "UPDATE_DEV_STATUS",
      taskId,
      status,
    });
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      dispatch({
        type: "ADD_COLUMN",
        id: newColumnName,
        title: newColumnName,
      });
      setNewColumnName("");
      setIsAddingColumn(false);
    }
  };

  const getTaskProgress = (task: ParentTask) => {
    const total = task.children.length;
    const completed = task.children.filter(
      (child) => child.status === "DONE"
    ).length;
    return { completed, total };
  };

  const canChangeDevStatus = (task: ParentTask): boolean => {
    return task.children.every((child) => child.status === "DONE");
  };

  const activeTask = activeId
    ? Object.values(board.columns)
        .flatMap((col) => col.childTasks)
        .find((task) => task.id === activeId)
    : null;

  const activeParentTask = activeTask
    ? board.parentTasks.find((p) => p.id === activeTask.parentId)
    : null;

  return (
    <div className="p-4 h-screen bg-muted/40">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold">Board</h1>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black text-xs dark:text-white flex items-center space-x-1 py-1 px-2"
          >
            <ZapIcon size="14" />
            <span className="font-semibold">{sprint?.name}</span>
          </HoverBorderGradient>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={`/project/${sprint?.projectId}/tasks/create?sprintId=${sprint?.id}`}
          >
            <Button className="h-8">Add task</Button>
          </Link>
          <Link href={`/project/${sprint?.projectId}/tasks`}>
            <Button variant="outline" className="h-8">
              All tasks
            </Button>
          </Link>
          {/* <Dialog open={isAddingColumn} onOpenChange={setIsAddingColumn}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Column</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Enter column name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                />
                <Button onClick={handleAddColumn}>Add Column</Button>
              </div>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        {/* Parent Tasks Column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Stories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {board.parentTasks.map((task) => (
                <ParentTaskCard
                  key={task.id}
                  task={task}
                  {...getTaskProgress(task)}
                  devStatusConfig={devStatusConfig}
                  onAddChild={(content) => {
                    taskMutation.mutate({
                      parentTaskId: task.id,
                      title: content,
                      status: "TODO",
                      projectId: projectId,
                      discussions: [{ content: "" }],
                      issueType: "TASK",
                      sprintId: sprintId,
                      epicId: task.epicId,
                    });
                    mutation.mutate({
                      id: +task.id,
                      status: "TODO",
                      parentId: null,
                      parentStatus: null,
                    });
                  }}
                  onDevStatusChange={(status) =>
                    handleDevStatusChange(task.id, status)
                  }
                  canChangeDevStatus={canChangeDevStatus(task)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Child Tasks Columns */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(board.columns).map((column) => (
              <Droppable
                key={column.id}
                column={column}
                parentTasks={board.parentTasks}
              />
            ))}
          </div>
          <DragOverlay>
            {activeId && activeTask && (
              <div className="transform-gpu">
                <TaskCard task={activeTask} parentTask={activeParentTask} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
