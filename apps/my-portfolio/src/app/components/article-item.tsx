import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function ArticleItem() {
  return (
    <article className="py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center">
        <div className="rounded w-16 h-16 sm:w-[88px] sm:h-[88px] object-cover mr-6 bg-gray-400" />
        <div className="w-full">
          <div className="text-xs text-slate-500 uppercase mb-1">
            <span className="text-yellow-500">—</span>
            <time>Apr 28, 2024</time>
            <span className="text-slate-400 dark:text-slate-600">·</span> 5 Min
            read
          </div>
          <h3 className="text-lg font-[650] mb-1">
            <a className="inline-flex relative hover:text-yellow-500 duration-150 ease-out before:scale-x-0 before:origin-center before:absolute before:inset-0 before:bg-yellow-200 dark:before:bg-yellow-500 before:opacity-30 before:-z-10 before:translate-y-1/4 before:-rotate-2 hover:before:scale-100 before:duration-150 before:ease-in-out">
              The FSE 150 experience: Best class of my life?
            </a>
          </h3>
          <div className="flex w-full justify-between items-center">
            <div className="grow text-sm text-slate-500 dark:text-slate-400">
              This is my reflection on a class I took in my second semester
              at ASU. It is probably the best class of my life.
            </div>
            <Link
              className="hidden lg:flex shrink-0 text-yellow-500 items-center justify-center w-12 group"
              href="/posts/gcsp-fse-150"
            >
              <ArrowRightIcon className="fill-current group-hover:translate-x-2 duration-150 w-12 h-5 ease-in-out" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleItem;
