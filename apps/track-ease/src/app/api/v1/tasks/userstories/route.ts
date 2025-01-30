import { taskSchema } from "@/app/(protected)/project/[projectId]/tasks/data/schema";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const sprintId = searchParams.get("sprintId");
  const tasks = id
    ? await prisma.epic.findMany({
        where: { releaseId: id },
        select: {
          tasks: {
            select: { id: true, title: true },
            where: {
              AND: [
                { issueType: "USERSTORY" },
                {
                  OR: [
                    { sprintId: { equals: null } },
                    { sprintId: { equals: sprintId } },
                  ],
                },
              ],
            },
          },
        },
      })
    : await prisma.epic.findMany({
        select: {
          tasks: {
            select: { id: true, title: true },
            where: { sprintId: { equals: null } },
          },
        },
      });
  return NextResponse.json(
    { userStories: tasks.map((task) => task.tasks.flat()).flat() },
    { status: 200 }
  );
}
