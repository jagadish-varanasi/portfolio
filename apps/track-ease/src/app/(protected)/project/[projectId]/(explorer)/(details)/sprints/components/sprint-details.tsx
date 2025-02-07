import { getSprintBoardDetails } from "@/app/actions";
import { Badge } from "@repo/ui/components/badge";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@repo/ui/components/card";
import { CheckCircle2, Inbox, InboxIcon, ListTodo, Timer } from "lucide-react";
import React from "react";

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

function SprintDetails({ id }: { id: string }) {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sprintDetails", id],
    queryFn: async () => {
      return await getSprintBoardDetails(id);
    },
    select: (data) => {
      if (data?.tasks) return groupTasksByStatus(data?.tasks);
      return null;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!tasks) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {/* Empty State */}
        <Inbox className="h-8 w-8 mx-auto mb-2" />
        <p>No items in todo</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-2">
      {/* Todo Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">To Do</h3>
            </div>
            <Badge variant="secondary">{tasks?.TODO?.length || 0}</Badge>
          </div>
          <div className="space-y-4">
            {tasks?.TODO?.map((task) => (
              <div key={task.parentTask.id} className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">{task.parentTask.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {task?.parentTask.Epic?.title}
                </p>
                <div className="mt-2">
                  {task.childTasks?.map((task: any) => (
                    <Badge
                      variant="outline"
                      className="bg-white shadow-md"
                      key={task.id}
                    >
                      {task?.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )) ?? (
              <div className="text-center py-8 text-muted-foreground">
                {/* Empty State */}
                <Inbox className="h-8 w-8 mx-auto mb-2" />
                <p>No items in todo</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* In Progress Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">In Progress</h3>
            </div>
            <Badge variant="secondary">{tasks?.INPROGRESS?.length || 0}</Badge>
          </div>
          <div className="space-y-4">
            {tasks.INPROGRESS?.map((task) => (
              <div key={task.parentTask.id} className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">{task.parentTask.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {task?.parentTask.Epic?.title}
                </p>
                <div className="mt-2">
                  {task.childTasks?.map((task: any) => (
                    <Badge
                      variant="outline"
                      className="bg-white shadow-md"
                      key={task.id}
                    >
                      {task?.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )) ?? (
              <div className="text-center py-8 text-muted-foreground">
                {/* Empty State */}
                <Inbox className="h-8 w-8 mx-auto mb-2" />
                <p>No items in inprogress</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Done Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Done</h3>
            </div>
            <Badge variant="secondary">{tasks?.DONE?.length || 0}</Badge>
          </div>
          <div className="space-y-4">
            {tasks.DONE?.map((task) => (
              <div key={task.parentTask.id} className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">{task.parentTask.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {task?.parentTask.Epic?.title}
                </p>
                <div className="mt-2">
                  {task.childTasks?.map((task: any) => (
                    <Badge
                      variant="outline"
                      className="bg-white shadow-md"
                      key={task.id}
                    >
                      {task?.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )) ?? (
              <div className="text-center py-8 text-muted-foreground">
                {/* Empty State */}
                <Inbox className="h-8 w-8 mx-auto mb-2" />
                <p>No items in done</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SprintDetails;
