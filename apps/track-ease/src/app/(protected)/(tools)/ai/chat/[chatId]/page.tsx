import { auth } from "@/auth";
import ChatInterface from "../../components/ChatInterface";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import prisma from "@/lib/db";

interface ChatPageProps {
  params: {
    chatId: any;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  // Get user authentication
  const session = await auth();

  if (!session?.user.id) {
    redirect("/");
  }

  try {
    const chats = await prisma.chat.findMany({
      where: { userId: session.user.id, chatId: +chatId },
      select: { messages: true },
    });

    if (!true) {
      console.log(
        "⚠️ Chat not found or unauthorized, redirecting to dashboard"
      );
      redirect("/ai");
    }

    const initialMessages = chats.map((chat) => chat.messages).flat();

    // Get messages

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
      </div>
    );
  } catch (error) {
    console.error("🔥 Error loading chat:", error);
    redirect("/ai");
  }
}
