"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import TimeAgo from "react-timeago";
// import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/context/Navigation";
import { createChat, deleteChat } from "@/app/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import BackButton from "@/app/(protected)/(user)/project/[projectId]/tasks/components/back-button";

function ChatRow({
  chat,
  onDelete,
}: {
  chat: any;
  onDelete: (id: any) => void;
}) {
  const router = useRouter();
  const { closeMobileNav } = useNavigation();

  const {
    isPending,
    error,
    data: lastMessage,
  } = useQuery({
    queryKey: ["lastMessage", chat.chatId],
    queryFn: () =>
      fetch(`/api/v1/chats/getLastMessage?chatId=${chat.chatId}`).then((res) =>
        res.json()
      ),
    select: (data) => data?.lastMessage,
  });

  console.log(chat, "CHAT", lastMessage);

  const handleClick = () => {
    router.push(`/ai/chat/${chat.chatId}`);
    closeMobileNav();
  };

  return (
    <div
      className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 truncate flex-1 font-medium">
            {lastMessage ? (
              <>
                {lastMessage?.role === "USER" ? "You: " : "AI: "}
                {lastMessage?.content.replace(/\\n/g, "\n")}
              </>
            ) : (
              <span className="text-gray-400">New conversation</span>
            )}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat.chatId);
            }}
          >
            <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
          </Button>
        </div>
        {lastMessage && (
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            <TimeAgo date={lastMessage.createdAt} />
          </p>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = useNavigation();
  const queryClient = useQueryClient();

  const { error: chatsError, data: chatsData } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetch(`/api/v1/chats`).then((res) => res.json()),
    select: (data) => data.chats,
  });

  const handleNewChat = async () => {
    const { id } = await createChat({ title: "New Chat" });
    router.push(`/ai/chat/${id}`);
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    closeMobileNav();
  };

  const handleDeleteChat = async (id: any) => {
    await deleteChat({ id });
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    if (window.location.pathname.includes(id)) {
      router.push("/ai");
    }
  };

  return (
    <>
      {/* Background Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}

      <div
        className={cn(
          "fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72 bg-gray-50/80 backdrop-blur-xl border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          className={`h-[52px] flex items-center gap-2 ml-2 ${isMobileNavOpen ? "mt-4" : "mt-2"}`}
        >
          <BackButton />
          <Link href="/dashboard">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              TrackEase AI
            </div>
          </Link>
        </div>
        <div
          className={` ${isMobileNavOpen ? "mt-2" : ""} p-2 border-b border-gray-200/50`}
        >
          <Button
            onClick={handleNewChat}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/50 shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {chatsData?.map(
            (chat: { title: string; chatId: number; userId: string }) => (
              <ChatRow
                key={chat.chatId}
                chat={chat}
                onDelete={handleDeleteChat}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
