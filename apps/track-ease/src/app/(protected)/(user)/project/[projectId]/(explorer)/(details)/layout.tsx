import { Metadata } from "next";
import prisma from "@/lib/db";
import { Separator } from "@repo/ui/components/separator";
import DetailsCards from "./components/details-cards";
import DetailsContextProvider from "@/context/DetailsContext";

export const metadata: Metadata = {
  title: "Home",
  description: "TrackEase Home Page",
};

interface DetailsLayoutProps {
  children: React.ReactNode;
  params: { projectId: string };
}

export default async function DetailsLayout({
  children,
  params: { projectId },
}: DetailsLayoutProps) {
  const details = await prisma.project.findUnique({
    where: { id: projectId },
  });
  return (
    <div className="md:flex w-full gap-4 h-full">
      <div className="md:w-[50%]">{children}</div>
      <Separator orientation="horizontal" className="mt-6 md:hidden" />
      <Separator orientation="vertical" className="mx-3" />
      <div className="mt-24 md:w-[50%] md:mt-[12px] space-x-2">
        <DetailsCards />
      </div>
    </div>
  );
}
