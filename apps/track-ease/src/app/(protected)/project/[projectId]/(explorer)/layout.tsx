import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./components/sidebar-nav";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Home",
  description: "TrackEase Home Page",
};

const sidebarNavItems = (projectId: string) => [
  {
    title: "Home",
    href: `/project/${projectId}/home`,
  },
  {
    title: "Tasks",
    href: `/project/${projectId}/tasks`,
  },
  {
    title: "Requirement Gathering",
    href: `/project/${projectId}/requirement-gathering`,
  },
  {
    title: "Epics",
    href: `/project/${projectId}/epics`,
  },
  {
    title: "Releases",
    href: `/project/${projectId}/releases`,
  },
  {
    title: "Sprints",
    href: `/project/${projectId}/sprints`,
  },

  {
    title: "Timelines",
    href: `/project/${projectId}/timelines`,
  },
  {
    title: "Team",
    href: `/project/${projectId}/team`,
  },
  {
    title: "Arch & tech",
    href: `/project/${projectId}/tech`,
  },

  {
    title: "Risks",
    href: `/project/${projectId}/risks`,
  },
  {
    title: "Documentation",
    href: `/project/${projectId}/documentation`,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: { projectId: string };
}

export default async function SettingsLayout({
  children,
  params: { projectId },
}: SettingsLayoutProps) {
  const details = await prisma.project.findUnique({
    where: { id: projectId },
  });
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav details={details} items={sidebarNavItems(projectId)} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
