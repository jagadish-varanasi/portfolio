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
  ClipboardCheck,
  DeleteIcon,
  ListCheck,
} from "lucide-react";
import HighLevelRequirements from "./highlevel-requirments";
import ViewDetails from "../../components/view-details";
import { ADD_REQUIREMENT } from "@/context/DetailsContext";

export function AllReleases({ data, type, projectId, openedTab }: any) {
  console.log(data, type);
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((release: any) => (
        <AccordionItem value={`item-${release.id}`} key={release.id}>
          <AccordionTrigger>{release?.name}</AccordionTrigger>
          <AccordionContent>
            <div>{release.description}</div>
            {type === "drafts" ? (
              <div className="mt-2 flex gap-2">
                <Link href={`?tab=${type}&draftId=${release?.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    <ListCheck className="h-4 w-4 mr-1" />
                    Edit draft
                  </Badge>
                </Link>
                <Alert draftId={release?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    <DeleteIcon className="h-4 w-4 mr-1" />
                    Delete draft
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`epic-grooming/${release.id}?type=groom`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bold"
                  >
                    <BookCheckIcon className="h-4 w-4 mr-1" />
                    Groom as epic
                  </Badge>
                </Link>
                <Link
                  href={`/project/${projectId}/tasks/create?initiation=${release.id}`}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <ClipboardCheck className="h-4 w-4 mr-1" />
                    Groom as user story
                  </Badge>
                </Link>
                <ViewDetails type={ADD_REQUIREMENT} id={release.id} />
              </div>
            )}
            <div className="grid gap-2 mt-4 ">
              <h4 className="font-medium">High-level requirements</h4>
              <HighLevelRequirements
                useCase="requirements"
                id={release.id}
                type={type}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
