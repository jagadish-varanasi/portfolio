import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");
  const tasks = projectId
    ? await prisma.task.findMany({ where: { projectId } })
    : await prisma.task.findMany({});
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();
  const task = await req.json();
  await prisma.task.create({
    data: {
      ...task,
      userId: session?.user?.id,
      discussions: {
        createMany: {
          data: task.discussions.map((d: { content: any }) => ({
            content: d.content,
            userId: session?.user?.id,
          })),
        },
      },
    },
  });
  return NextResponse.json(task);
}
