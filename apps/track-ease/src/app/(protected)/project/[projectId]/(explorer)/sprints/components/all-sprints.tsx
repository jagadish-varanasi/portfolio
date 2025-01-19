import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";
import Alert from "./alert-dialog";

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
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Edit
                  </Badge>
                </Link>
                <Alert draftId={sprint?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Delete
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`board/${sprint.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Board
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-extrabold"
                >
                  {sprint.release.name}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-extrabold"
                >
                  Team
                </Badge>
              </div>
            )}
            <div className="grid gap-2 mt-4">
              <div>Status</div>
              {Object.entries(sprint?.statusCounts).map(([key, value]) => (
                <span key={key} className="capitalize">
                  {`${key}-${value}`?.toLocaleLowerCase()}
                </span>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
