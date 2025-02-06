import { useQuery } from "@tanstack/react-query";
import { Highlight } from "./higlight";
import {
  getEpicCompleteDetails,
  getInitiationDetails,
  getReleaseDetails,
  getPinnedSprintDetails,
} from "@/app/actions";

export const CARDS = [
  {
    id: 0,
    key: "requirements",
    name: "Requirement",
    designation: <Highlight>Requirement is to analyze</Highlight>,
    content: (id: string) => {
      const {
        isPending,
        error,
        data: card,
      } = useQuery({
        queryKey: ["requirements", id],
        queryFn: async () => await getInitiationDetails(id),
      });
      return (
        <>
          <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
            {card?.name}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card?.name}
            </p>
            <div className="text-neutral-400 font-normal dark:text-neutral-200">
              {card?.description}
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: 1,
    key: "epics",
    name: "Epic",
    designation: <Highlight>Epic is bigger chunk of requirement.</Highlight>,
    content: (id: string) => {
      const {
        isPending,
        error,
        data: card,
      } = useQuery({
        queryKey: ["epics-details", id],
        queryFn: async () => await getEpicCompleteDetails(id),
      });
      return (
        <>
          <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
            {card?.title}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card?.title}
            </p>
            <div className="text-neutral-400 font-normal dark:text-neutral-200">
              {card?.description}
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: 2,
    key: "releases",
    name: "Release",
    designation: (
      <Highlight>Release contains info about major solutions.</Highlight>
    ),
    content: (id: string) => {
      const {
        isPending,
        error,
        data: card,
      } = useQuery({
        queryKey: ["releases", id],
        queryFn: async () => await getReleaseDetails(id),
      });
      return (
        <>
          <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
            {card?.name}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card?.name}
            </p>
            <div className="text-neutral-400 font-normal dark:text-neutral-200">
              {card?.description}
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: 3,
    key: "sprints",
    name: "Sprint",
    designation: (
      <Highlight>Sprint contains info about major solutions.</Highlight>
    ),
    content: (id: string) => {
      const {
        isPending,
        error,
        data: card,
      } = useQuery({
        queryKey: ["sprints-details", id],
        queryFn: async () => await getPinnedSprintDetails(id),
      });
      return (
        <>
          <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
            {card?.name}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card?.name}
            </p>
            <div className="text-neutral-400 font-normal dark:text-neutral-200">
              {card?.description}
            </div>
          </div>
        </>
      );
    },
  },
];
