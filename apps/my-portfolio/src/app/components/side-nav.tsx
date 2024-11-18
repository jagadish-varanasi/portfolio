"use client";
import {
  BackpackIcon,
  CopyIcon,
  HomeIcon,
  InfoCircledIcon,
  PaperPlaneIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { FloatingDock } from "@repo/ui/components/floating-dock";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const config = [
  { to: "/", icon: <HomeIcon width="24px" height="24px" />, name: "Home" },
  {
    to: "/about",
    icon: <InfoCircledIcon height="24px" width="24px" />,
    name: "About",
  },
  {
    to: "/blog",
    icon: <ReaderIcon height="24px" width="24px" />,
    name: "Blog",
  },
  {
    to: "/projects",
    icon: <BackpackIcon height="24px" width="24px" />,
    name: "Projects",
  },
  {
    to: "/resume",
    icon: <CopyIcon height="24px" width="24px" />,
    name: "Resume",
  },
  {
    to: "/write",
    icon: <PaperPlaneIcon height="24px" width="24px" />,
    name: "Write",
  },
];

function SideNav() {
  const pathname = usePathname();
  const currentRoute = `/${pathname.split("/")[1]}`;
  return (
    <div className="fixed w-full md:sticky bottom-0 md:top-0 h-16 md:w-24 shrink-0 md:h-screen overflow-y-auto no-scrollbar border-r dark:border-slate-800 z-50 backdrop-filter backdrop-blur-lg">
      <div className="h-full w-full flex flex-row md:flex-col justify-between">
        <div className="flex-1 grow flex items-center w-full">
          <nav className="w-full">
            <ul className="md:space-y-4 flex flex-row items-center w-screen justify-evenly md:flex-col md:justify-start md:items-center md:w-24">
              {config.map((route) => (
                <li className="md:py-2" key={route.name}>
                  <Link
                    className={cn(
                      "w-full h-6 flex items-center justify-center   ",
                      currentRoute === route.to
                        ? "text-gold"
                        : " text-slate-400 dark:text-slate-500",
                      currentRoute === route.to
                        ? "dark:text-gold"
                        : " dark:hover:text-slate-400 hover:text-slate-600"
                    )}
                    href={route.to}
                  >
                    <span className="sr-only">{route.name}</span>
                    {route.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
