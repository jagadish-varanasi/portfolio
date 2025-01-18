import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./components/sidebar-nav";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
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
    title: "Sprints",
    href: `/project/${projectId}/sprints`,
  },
  {
    title: "Releases",
    href: `/project/${projectId}/releases`,
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
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav details={details} items={sidebarNavItems(projectId)} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
