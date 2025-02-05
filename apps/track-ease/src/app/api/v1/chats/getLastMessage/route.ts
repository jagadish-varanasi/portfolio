import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const chatId = searchParams?.get("chatId");
  if (!chatId) {
    return NextResponse.json(
      { message: "ChatId not present" },
      { status: 400 }
    );
  }
  const lastMessage = await prisma.message.findFirst({
    where: {
      chatId: +chatId, // Replace with the actual chat ID
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
  return NextResponse.json({ lastMessage }, { status: 200 });
}
