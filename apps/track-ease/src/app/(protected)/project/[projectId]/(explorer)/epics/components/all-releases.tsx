import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";
import Alert from "./alert-dialog";
import { useSearchParams } from "next/navigation";

export function AllReleases({
  data,
  type,
  projectId,
  openedTab,
  defaultOpen,
}: any) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={`item-${defaultOpen}`}
    >
      {data.map((release: any) => (
        <AccordionItem value={`item-${release.id}`} key={release.id}>
          <AccordionTrigger>{release?.title}</AccordionTrigger>
          <AccordionContent>
            <div>{release.description}</div>
            {type === "drafts" ? (
              <div className="mt-2 flex gap-2">
                <Link href={`release-grooming/${release.id}?type=edit`}>
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
                <Link href={`./tasks/create?epicId=${release.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Create User Story
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-extrabold"
                >
                  Requirements
                </Badge>
                <Link href={`?&tab=saved&ac=${release.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-extrabold"
                  >
                    Acceptance Criteria Document
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-extrabold"
                >
                  Team
                </Badge>
              </div>
            )}
            <div className="grid gap-2 mt-4">
              <div>High-level requirements</div>
              {release?.highLevelRequirements?.map((data: any) => (
                <div
                  className="break-all"
                  key={data?.id}
                >{`#${data.priority} ${data?.requirement}`}</div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
