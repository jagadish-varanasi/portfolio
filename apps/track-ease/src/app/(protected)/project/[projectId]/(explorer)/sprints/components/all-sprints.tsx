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
  DeleteIcon,
  Edit2Icon,
  FileBoxIcon,
  Kanban,
} from "lucide-react";

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
            <div className="grid gap-2 mt-4">
              <h4 className="font-medium">Status</h4>
              <ul className="list-disc pl-6 space-y-2">
                {Object.entries(sprint?.statusCounts).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    {`${key}-${value}`?.toLocaleLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
