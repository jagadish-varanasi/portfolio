import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const chatId = params.chatId;

  if (!chatId) {
    return NextResponse.json({ message: "ChatId missing" }, { status: 401 });
  }

  const chats = await prisma.chat.findMany({
    where: { userId: session.user.id, chatId: +chatId },
    include: { messages: true },
  });
  return NextResponse.json({ chats }, { status: 200 });
}
