import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function ProjectItem() {
  return (
    <Link
      className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:-rotate-1 even:rotate-1 hover:rotate-0 transition-transform duration-700 hover:duration-100 ease-in-out p-5"
      href="https://github.com/Dhravya/radish"
    >
      <div className="flex flex-col h-full">
        <div className="grow">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full mb-2">
              <div className="rounded-full w-12 h-12 " />
            </div>
          </div>
          <div className="text-lg  font-[650] mb-1">Radish</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Super fast drop-in replacement of the in memory key-value store
            Redis, made in Golang
          </p>
        </div>
        <div className="text-yellow-500 flex justify-end">
          <ArrowRightIcon className="w-12 h-5" />
        </div>
      </div>
    </Link>
  );
}

export default ProjectItem;
