import React from "react";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@repo/ui/components/button";
import { FeedbackModal } from "./components/feedback-modal";
import { Sparkles } from "lucide-react";
import { BackgroundGradient } from "@repo/ui/components/background-gradiant";
import DetailsContextProvider from "@/context/DetailsContext";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14  items-center border px-8">
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
              TrackEase
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2 space-x-4">
            <Link className="mr-7" href="/admin/dashboard">
              {session?.user?.role === "ADMIN" && (
                <Button variant="outline" className="h-8">
                  Admin
                </Button>
              )}
            </Link>
            <Link className="mr-7" href="/ai">
              <BackgroundGradient
                containerClassName="rounded-full"
                className="flex text-purple-600 items-center bg-white rounded-full py-1 px-2 text-sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assistant
              </BackgroundGradient>
            </Link>
            <FeedbackModal />
            <UserNav />
          </div>
        </div>
      </div>
      <DetailsContextProvider>{children}</DetailsContextProvider>
    </div>
  );
}

export default layout;
