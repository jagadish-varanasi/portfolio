import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const releaseId = searchParams.get("releaseId");
  const sprintId = searchParams.get("sprintId");
  const tasks = releaseId
    ? await prisma.epic.findMany({
        where: { EpicOnReleases: { some: { releaseId } } },
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
            where: { sprintId: { equals: null }, issueType: "USERSTORY" },
          },
        },
      });
  return NextResponse.json(
    { userStories: tasks.map((task) => task.tasks.flat()).flat() },
    { status: 200 }
  );
}
