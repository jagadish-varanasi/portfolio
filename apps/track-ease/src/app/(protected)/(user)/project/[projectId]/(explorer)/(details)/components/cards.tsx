import { useQuery } from "@tanstack/react-query";
import { Highlight } from "./higlight";
import {
  getEpicCompleteDetails,
  getInitiationDetails,
  getReleaseDetails,
  getMyTasks,
} from "@/app/actions";
import { Skeleton } from "@repo/ui/components/skeleton";
import { CircleIcon, InboxIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

function RequirementCard({ id }: { id: string }) {
  const { isLoading, data: card } = useQuery({
    queryKey: ["requirements", id],
    queryFn: async () => await getInitiationDetails(id),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (!card?.id) {
    return <div>No pinned requirement</div>;
  }

  return (
    <>
      <div>
        <p className="text-neutral-500 font-medium dark:text-white">
          {card?.name}
        </p>
        <div className="text-neutral-400 font-normal dark:text-neutral-200">
          {card?.description}
        </div>
      </div>
      <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
        <div className="grid gap-2 mt-4 ">
          <h4 className="font-medium">High-level requirements</h4>
          <ul className="list-disc pl-6 space-y-2">
            {card?.highLevelRequirements.map((data: any) => (
              <li
                className="break-all"
                key={data?.id}
              >{`#P${data.priority} ${data?.requirement}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function EpicCard({ id }: { id: string }) {
  const {
    isLoading,
    error,
    data: card,
  } = useQuery({
    queryKey: ["epics-details", id],
    queryFn: async () => await getEpicCompleteDetails(id),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (!card?.id) {
    return <div>No pinned Epic</div>;
  }

  return (
    <>
      <div>
        <p className="text-neutral-500 font-medium dark:text-white">
          {card?.title}
        </p>
        <div className="text-neutral-400 font-normal dark:text-neutral-200">
          {card?.description}
        </div>
      </div>
      <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
        <div className="grid gap-2 mt-4 ">
          <h4 className="font-medium">High-level requirements</h4>
          <ul className="list-disc pl-6 space-y-2">
            {card?.highLevelRequirements.map((data: any) => (
              <li
                className="break-all"
                key={data?.id}
              >{`#P${data.priority} ${data?.requirement}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ReleaseCard({ id }: { id: string }) {
  const {
    isLoading,
    error,
    data: card,
  } = useQuery({
    queryKey: ["releases", id],
    queryFn: async () => await getReleaseDetails(id),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (!card?.id) {
    return <div>No pinned Release</div>;
  }

  return (
    <>
      <div>
        <p className="text-neutral-500 font-medium dark:text-white">
          {card?.name}
        </p>
        <div className="text-neutral-400 font-normal dark:text-neutral-200">
          {card?.description}
        </div>
      </div>
      <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
        <div className="grid gap-2 mt-4">
          <h4 className="font-medium">Epics</h4>
          {card?.EpicOnReleases?.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {card?.EpicOnReleases?.map((data: any) => (
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
          {card?.sprints?.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {card?.sprints?.map((data: any) => (
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
      </div>
    </>
  );
}

export const statuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "INPROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "CANCELED",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

function MyTasksCard({ id, projectId }: { id: string; projectId: string }) {
  const {
    isLoading,
    error,
    data: tasks,
  } = useQuery({
    queryKey: ["my-tasks", id, projectId],
    queryFn: async () => await getMyTasks(projectId),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <>
      <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right w-[120px]">Story Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => {
              const status =
                statuses.find((status) => status.value === task.status) ||
                statuses[0];
              return (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{status.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell className="text-right">
                    {task.storyPoints ?? "NA"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="">
            <TableRow>
              <TableCell colSpan={3}>Total Story Points</TableCell>
              <TableCell className="text-right">
                {tasks?.reduce((acc, cv) => (acc += cv?.storyPoints ?? 0), 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

export const CARDS = [
  {
    id: 0,
    key: "mytasks",
    name: "My Tasks",
    designation: (
      <Highlight>Sprint contains info about major solutions.</Highlight>
    ),
    content: (id: string, projectId: string) => (
      <MyTasksCard id={id} projectId={projectId} />
    ),
  },
  {
    id: 1,
    key: "requirements",
    name: "Requirement",
    designation: <Highlight>Requirement is to analyze</Highlight>,
    content: (id: string, projectId: string) => <RequirementCard id={id} />,
  },
  {
    id: 2,
    key: "epics",
    name: "Epic",
    designation: <Highlight>Epic is bigger chunk of requirement.</Highlight>,
    content: (id: string, projectId: string) => <EpicCard id={id} />,
  },
  {
    id: 3,
    key: "releases",
    name: "Release",
    designation: (
      <Highlight>Release contains info about major solutions.</Highlight>
    ),
    content: (id: string, projectId: string) => <ReleaseCard id={id} />,
  },
];
