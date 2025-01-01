import React from "react";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@repo/ui/components/button";

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

          <div className="ml-auto flex items-center space-x-4">
            <Link className="mr-7" href="/admin/dashboard">
              {session?.user?.role === "ADMIN" && (
                <Button variant="outline" className="h-9">
                  Admin
                </Button>
              )}
            </Link>
            <UserNav />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default layout;
