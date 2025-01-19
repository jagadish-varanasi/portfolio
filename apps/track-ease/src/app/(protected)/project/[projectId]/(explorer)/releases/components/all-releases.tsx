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
            {type === "drafts" ? (
              <div className="mt-2 flex gap-2">
                <Link href={`?tab=${type}&draftId=${release?.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Edit draft
                  </Badge>
                </Link>
                <Alert draftId={release?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Delete draft
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`release-grooming/${release.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Groom
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-extrabold"
                >
                  Requirements
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
              <div>Epics</div>
              {release?.epics?.length ? (
                release?.epics?.map((data: any) => (
                  <div key={data?.id}>{`#${data.title}`}</div>
                ))
              ) : (
                <div>No epics mapped</div>
              )}
            </div>
            <div className="grid gap-2 mt-4">
              <div>Sprints</div>
              {release?.sprints?.length ? (
                release?.sprints?.map((data: any) => (
                  <div key={data?.id}>{`#${data.name}`}</div>
                ))
              ) : (
                <div>No sprints created</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
