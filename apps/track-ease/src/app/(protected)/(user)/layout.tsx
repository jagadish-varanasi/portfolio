import React from "react";
import { UserNav } from "../components/user-nav";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@repo/ui/components/button";
import { Shield, Sparkles } from "lucide-react";
import { BackgroundGradient } from "@repo/ui/components/background-gradiant";
import DetailsContextProvider from "@/context/DetailsContext";
import { FeedbackModal } from "./components/feedback-modal";

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
            <FeedbackModal />
            <Link className="hidden md:block mr-2" href="/admin/dashboard">
              {session?.user?.role === "ADMIN" && (
                <button className="relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                  <div className="pl-5 pr-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors">
                    Admin
                  </div>
                </button>
              )}
            </Link>
            <Link className="hidden md:block mr-7" href="/ai">
              <button className="relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div className="pl-5 pr-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors">
                  AI Assistant
                </div>
              </button>
            </Link>
            <UserNav />
          </div>
        </div>
      </div>
      <DetailsContextProvider>{children}</DetailsContextProvider>
    </div>
  );
}

export default layout;
