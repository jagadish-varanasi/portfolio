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
  console.log(sprintsWithStatusCounts);
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
            {/* <div className="grid gap-2 mt-4">
              <h4 className="font-medium">Status</h4>
              <ul className="list-disc pl-6 space-y-2">
                {Object.entries(sprint?.statusCounts).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    {`${key}-${value}`?.toLocaleLowerCase()}
                  </li>
                ))}
              </ul>
            </div> */}
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
                    <Badge variant="secondary">3</Badge>
                  </div>
                  {/* Empty State */}
                  <div className="text-center py-8 text-muted-foreground">
                    <Inbox className="h-8 w-8 mx-auto mb-2" />
                    <p>No items in todo</p>
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
                    <Badge variant="secondary">2</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">
                        Setup i18next Framework
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Implementing base configuration and language detection
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">
                        Language Switcher Component
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Creating UI component for language selection
                      </p>
                    </div>
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
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">
                        Initial Requirements Gathering
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Completed documentation of i18n requirements
                      </p>
                    </div>
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
