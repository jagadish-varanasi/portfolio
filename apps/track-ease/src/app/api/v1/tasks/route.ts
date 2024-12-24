import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany({});
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();
  const task = await req.json();
  console.log(task);
  await prisma.task.create({ data: { ...task, userId: session?.user?.id } });
  return NextResponse.json(task);
}
