import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const chatId = request.query["chatId"];

  if (!chatId) {
    return NextResponse.json({ message: "ChatId missing" }, { status: 401 });
  }

  const chats = await prisma.chat.findMany({
    where: { userId: session.user.id, chatId: +chatId },
    include: { messages: true },
  });
  return NextResponse.json({ chats }, { status: 200 });
}
