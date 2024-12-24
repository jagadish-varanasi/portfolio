import Link from "next/link";
import React from "react";
import DashboardItems from "../components/dashboard/DashboardItems";
import { CircleUserIcon } from "lucide-react";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="h-full flex max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={"/"} className="flex items-center gap-2 font-semibold">
              <div className="text-xl w-6 h-6 flex justify-center items-center text-white bg-black dark:text-black dark:bg-white rounded-tr-xl rounded-br-sm shadow-lg font-bold">
                P
              </div>
              <h4 className="text-lg font-semibold">
                <span className="text-primary">Publish</span>
              </h4>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bbg-muted/40 px-4 lg:h-[60px] lg-px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUserIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}

export default DashboardLayout;
