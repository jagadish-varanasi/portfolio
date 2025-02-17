import prisma from "@/lib/db";
import Link from "next/link";
import { ProjectCard } from "./components/project-card";
import { auth } from "@/auth";

async function Dashboard() {
  const session = await auth();
  const projects = await prisma.project.findMany({
    where: { ProjectOnUsers: { some: { userId: session?.user?.id } } },
    include: {
      ProjectOnUsers: {
        select: {
          user: { select: { id: true, name: true, email: true } },
          role: true,
        },
      },
    },
  });

  console.log(JSON.stringify(projects));

  return (
    <div className="md:grid lg:grid-cols-3 gap-8 p-8">
      {projects.map((project) => {
        return (
          <Link href={`/project/${project.id}/home`} key={project.id}>
            <ProjectCard project={project} />
          </Link>
        );
      })}
    </div>
  );
}

export default Dashboard;
