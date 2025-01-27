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
              </div>
            )}
            <div className="grid gap-2 mt-4">
              <h4 className="font-medium">Epics</h4>
              {release?.epics?.length ? (
                <ul className="list-disc pl-6 space-y-2">
                  {release?.epics?.map((data: any) => (
                    <li
                      key={data?.id}
                      className="break-all"
                    >{`${data.title}`}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center">
                  <InboxIcon className="w-4 h-4 mr-1" />
                  No epics mapped
                </div>
              )}
            </div>
            <div className="grid gap-2 mt-4">
              <h4 className="font-medium">Sprints</h4>
              {release?.sprints?.length ? (
                <ul className="list-disc pl-6 space-y-2">
                  {release?.sprints?.map((data: any) => (
                    <li key={data?.id}>{`${data.name}`}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center">
                  <InboxIcon className="w-4 h-4 mr-1" />
                  No sprints created
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
