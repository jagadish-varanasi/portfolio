import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";
import Alert from "./alert-dialog";
import {
  BookCheckIcon,
  CheckCircle2,
  DeleteIcon,
  Edit2Icon,
  FileBoxIcon,
  Inbox,
  InboxIcon,
  Kanban,
  ListTodo,
  Timer,
} from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/card";

export function AllSprints({ data, type, projectId, openedTab }: any) {
  console.log(data, type);
  const sprintsWithStatusCounts = data.map((sprint: any) => {
    const statusCounts = sprint.tasks.reduce((acc: any, task: any) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    return {
      ...sprint,
      statusCounts,
    };
  });
  return (
    <Accordion type="single" collapsible className="w-full">
      {sprintsWithStatusCounts.map((sprint: any) => (
        <AccordionItem value={`item-${sprint.id}`} key={sprint.id}>
          <AccordionTrigger>{sprint?.name}</AccordionTrigger>
          <AccordionContent>
            <div>{sprint.description}</div>
            {type === "upcoming" ? (
              <div className="mt-2 flex gap-2">
                <Link href={`?tab=${type}&sprintId=${sprint?.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <Edit2Icon className="h-4 w-5 mr-1" />
                    Edit
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-bold"
                >
                  {sprint.release.name}
                </Badge>
                <Alert draftId={sprint?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    <DeleteIcon className="h-4 w-5 mr-1" />
                    Delete
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`board/${sprint.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <Kanban className="h-4 w-5 mr-1" />
                    Board
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-bold"
                >
                  <BookCheckIcon className="h-4 w-4 mr-1" />
                  {sprint.release.name}
                </Badge>
              </div>
            )}
            <h4 className="font-medium mt-4">Overview</h4>
            <div className="space-y-6 mt-2">
              {/* Todo Section */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">To Do</h3>
                    </div>
                    <Badge variant="secondary">
                      {sprint?.statusCounts["TODO"] || 0}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {sprint.tasks
                      .filter((task: any) => task.status === "TODO")
                      .map((task: any) => (
                        <div className="p-3 bg-muted rounded-lg" key={task.id}>
                          <h4 className="font-medium mb-1">{task?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task?.Epic?.title}
                          </p>
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
                    <Badge variant="secondary">
                      {sprint?.statusCounts["INPROGRESS"] || 0}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {sprint.tasks
                      .filter((task: any) => task.status === "INPROGRESS")
                      .map((task: any) => (
                        <div className="p-3 bg-muted rounded-lg" key={task.id}>
                          <h4 className="font-medium mb-1">{task?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task?.Epic?.title}
                          </p>
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

              {/* Done Section */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">Done</h3>
                    </div>
                    <Badge variant="secondary">
                      {sprint?.statusCounts["DONE"] || 0}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {sprint.tasks
                      .filter((task: any) => task.status === "DONE")
                      .map((task: any) => (
                        <div className="p-3 bg-muted rounded-lg" key={task.id}>
                          <h4 className="font-medium mb-1">{task?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task?.Epic?.title}
                          </p>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
