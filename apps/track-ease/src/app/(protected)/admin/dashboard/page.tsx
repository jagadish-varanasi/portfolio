import { Button } from "@repo/ui/components/button";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

async function AdminDashboard() {
  const projects = await prisma.project.findMany({});
  return (
    <div className="p-8">
      <Link href="/admin/project/create">
        <Button>Create Project</Button>
      </Link>
      <div className="mt-10">
        {projects.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
