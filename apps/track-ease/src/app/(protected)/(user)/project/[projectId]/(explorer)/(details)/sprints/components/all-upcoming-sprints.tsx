"use client";
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
  Delete,
  Edit,
  Edit2Icon,
  FileText,
  InboxIcon,
  Kanban,
  Rocket,
} from "lucide-react";
import { Sprint } from "./sprint-details";

export function AllUpcomingSprint({
  data,
  type,
  projectId,
}: {
  data: Array<Sprint>;
  type: string;
  projectId: string;
}) {
  console.log(data, type);
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((sprint) => (
        <AccordionItem value={`item-${sprint.id}`} key={sprint.id}>
          <AccordionTrigger>{sprint?.name}</AccordionTrigger>
          <AccordionContent>
            <div>{sprint.description}</div>
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
              <Link href={`?tab=${type}&sprintId=${sprint?.id}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-bold"
                >
                  <Edit className="h-4 w-5 mr-1" />
                  Edit
                </Badge>
              </Link>
              <Badge
                variant="outline"
                className="cursor-pointer hover:font-bold"
              >
                <Rocket className="h-4 w-5 mr-1" />
                {sprint.release.name}
              </Badge>
              <Alert draftId={sprint?.id} projectId={projectId}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-bold"
                >
                  <Delete className="h-4 w-5 mr-1" />
                  Delete
                </Badge>
              </Alert>
            </div>
            <div className="grid gap-2 mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="h-5 w-5" />
                  <h3>User Stories & Tasks</h3>
                </div>
                <div className="space-y-4 pl-7">
                  {sprint?.tasks?.length ? (
                    sprint?.tasks?.map((data, index) => (
                      <div key={data.id} className="space-y-2">
                        <h4 className="font-medium">
                          {index + 1}. {data.title}{" "}
                          {data.Epic?.title ? (
                            <span>({data.Epic?.title})</span>
                          ) : (
                            ""
                          )}
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {data.childTasks?.map((task) => (
                            <li
                              key={task?.id}
                              className="break-all"
                            >{`${task.title}`}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center">
                      <InboxIcon className="w-5 h-5 mr-1" />
                      No epics mapped
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
