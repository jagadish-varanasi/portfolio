import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";
import Alert from "./alert-dialog";
import { format } from "date-fns";
import { DeleteIcon, Edit2Icon, InboxIcon, RocketIcon } from "lucide-react";
import EpicsSprints from "./epics-sprints";
import ViewDetails from "../../components/view-details";
import { ADD_RELEASE } from "@/context/DetailsContext";

export function AllReleases({ data, type, projectId, openedTab }: any) {
  console.log(data, type);
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((release: any) => (
        <AccordionItem value={`item-${release.id}`} key={release.id}>
          <AccordionTrigger>{release?.name}</AccordionTrigger>
          <AccordionContent>
            <div>{release.description}</div>
            <div className="text-xs mt-2 font-semibold">
              {`${format(release.startDate, "MMM-dd-yyyy")} to ${format(release.endDate, "MMM-dd-yyyy")}`}
            </div>
            {["drafts", "upcoming"].includes(type) ? (
              <div className="mt-2 flex gap-2">
                {type === "upcoming" && (
                  <Link href={`release-grooming/${release.id}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:font-bold"
                    >
                      <RocketIcon className="h-4 w-4 mr-1" />
                      Groom
                    </Badge>
                  </Link>
                )}
                <Link href={`?tab=${type}&releaseId=${release?.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <Edit2Icon className="h-4 w-4 mr-1" />
                    Edit draft
                  </Badge>
                </Link>
                <Alert draftId={release?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <DeleteIcon className="h-4 w-4 mr-1" />
                    Delete draft
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`release-grooming/${release.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <RocketIcon className="h-4 w-4 mr-1" />
                    Groom
                  </Badge>
                </Link>
                <ViewDetails type={ADD_RELEASE} id={release?.id} />
              </div>
            )}
            <EpicsSprints id={release?.id} type={type} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
