import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Article } from "./data/types";
import Image from "next/image";

function ArticleItem({ data }: { data: Article }) {
  return (
    <article className="py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center">
        <div className="rounded w-16 h-16 sm:w-[98px] sm:h-[88px] object-cover mr-6 relative">
          {data?.url && (
            <Image
              src={`/${data.url}`}
              alt={"blog-image"}
              layout="fill"
              style={{ height: "100%", width: "100%"}}
            />
          )}
        </div>
        <div className="w-full">
          <div className="text-xs text-slate-500 uppercase mb-1">
            <span className="text-yellow-500">—</span> <time>{data.date}</time>{" "}
            <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
            {data.readDuration} read
          </div>
          <h3 className="text-lg font-[650] mb-1">
            <a className="inline-flex relative hover:text-yellow-500 duration-150 ease-out before:scale-x-0 before:origin-center before:absolute before:inset-0 before:bg-yellow-200 dark:before:bg-yellow-500 before:opacity-30 before:-z-10 before:translate-y-1/4 before:-rotate-2 hover:before:scale-100 before:duration-150 before:ease-in-out">
              {data.title}
            </a>
          </h3>
          <div className="flex w-full justify-between items-center">
            <div className="grow text-sm text-slate-500 dark:text-slate-400">
              {data.description}
            </div>
            <Link
              className="hidden lg:flex shrink-0 text-yellow-500 items-center justify-center w-12 group"
              href={`/blog/${data.id}`}
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
