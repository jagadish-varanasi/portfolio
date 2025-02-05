import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const chats = await prisma.chat.findMany({
    where: { userId: session.user.id },
  });
  return NextResponse.json({ chats }, { status: 200 });
}
