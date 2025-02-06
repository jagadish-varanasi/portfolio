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
import { ClipboardList, FileSpreadsheet, Plus, UsersRound } from "lucide-react";

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
                <Link href={`epic-grooming/${release.id}?type=edit`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-1" />
                    Edit draft
                  </Badge>
                </Link>
                <Alert draftId={release?.id} projectId={projectId}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-1" />
                    Delete draft
                  </Badge>
                </Alert>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href={`./tasks/create?epicId=${release.id}`}>
                  <Badge variant="outline" className="cursor-pointer hover:font-bold">
                    <Plus className="h-4 w-4 mr-1" />
                    Create User Story
                  </Badge>
                </Link>
                <Link href={`?&tab=saved&ac=${release.id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:font-bold"
                  >
                    <ClipboardList className="h-4 w-4  mr-1" />
                    Acceptance Criteria Document
                  </Badge>
                </Link>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:font-bold"
                >
                  <UsersRound className="h-4 w-4  mr-1" />
                  Team
                </Badge>
              </div>
            )}
            <div className="grid gap-2 mt-4">
              <h4 className="font-medium">High-level requirements</h4>
              <ul className="list-disc pl-6 space-y-2">
                {release?.highLevelRequirements?.map((data: any) => (
                  <li
                    className="break-all"
                    key={data?.id}
                  >{`#P${data.priority} ${data?.requirement}`}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
