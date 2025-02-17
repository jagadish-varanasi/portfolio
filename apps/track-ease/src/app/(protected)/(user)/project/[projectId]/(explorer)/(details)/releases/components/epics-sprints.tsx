"use client";
import { releaseDetails } from "@/app/actions";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import React from "react";

function EpicsSprints({ id, type }: { id: string; type: "saved" | "drafts" }) {
  const {
    data: release,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [id, type],
    queryFn: async () => {
      return await releaseDetails(type, id);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <>
      <div className="grid gap-2 mt-4">
        <h4 className="font-medium">Epics</h4>
        {release?.EpicOnReleases?.length ? (
          <ul className="list-disc pl-6 space-y-2">
            {release?.EpicOnReleases?.map((data: any) => (
              <li
                key={data?.epic.id}
                className="break-all"
              >{`${data.epic.title}`}</li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center">
            <InboxIcon className="w-5 h-5 mr-1" />
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
            <InboxIcon className="w-5 h-5 mr-1" />
            No sprints created
          </div>
        )}
      </div>
    </>
  );
}

export default EpicsSprints;
