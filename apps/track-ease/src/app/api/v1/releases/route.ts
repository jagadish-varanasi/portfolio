import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required" },
      { status: 400 }
    );
  }
  const releases = await prisma.release.findMany({
    where: { projectId },
    select: { id: true, name: true },
  });
  return NextResponse.json({ releases }, { status: 200 });
}
