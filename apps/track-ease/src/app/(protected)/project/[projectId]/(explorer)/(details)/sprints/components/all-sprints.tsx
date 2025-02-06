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
import { BookCheckIcon, DeleteIcon, Edit2Icon, Kanban } from "lucide-react";
import SprintDetails from "./sprint-details";
import { SelectRangeProviderInternal } from "react-day-picker";
import ViewDetails from "../../components/view-details";
import { ADD_SPRINT } from "@/context/DetailsContext";

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
}

export function AllSprints({
  data,
  type,
  projectId,
  openedTab,
}: {
  data: Array<FormattedSprint>;
  type: string;
  projectId: string;
  openedTab: string;
}) {
  console.log(data, type, "AAAAAAAAAAAA");
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((sprint) => (
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
                <ViewDetails type={ADD_SPRINT} id={sprint.id} />
              </div>
            )}
            <h4 className="font-medium mt-4">Overview</h4>
            <SprintDetails id={sprint.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
