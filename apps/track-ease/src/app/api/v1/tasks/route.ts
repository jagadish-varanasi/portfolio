import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
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
  try {
    const createdTask = await prisma.task.create({
      data: {
        ...task,
        ...(task.parentTaskId && { parentTaskId: Number(task.parentTaskId) }),
        ...(task.storyPoints && { storyPoints: Number(task.storyPoints) }),
        userId: task.userId,
        discussions: {
          createMany: {
            data: task.discussions.map((d: { content: any }) => ({
              content: d.content,
              userId: task.userId,
            })),
          },
        },
      },
    });
    if (task.sprintId) {
      revalidatePath(`/project/${task.projectId}/board/${task.sprintId}`);
    }
    return NextResponse.json(createdTask);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
