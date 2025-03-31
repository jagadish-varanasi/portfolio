import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Article } from "./data/types";

function ArticleItem({ data }: { data: Article }) {
  return (
    <article className="py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center">
        <div className="w-full">
          <div className="text-xs text-slate-500 uppercase mb-1">
            <span className="text-gold">—</span> <time>{data.date}</time>{" "}
            <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
            {data.readDuration} read
          </div>
          <h3 className="text-lg font-[650] mb-1">
            <Link
              href={`/blog/${data.id}`}
              className="inline-flex relative hover:text-gold hover:underline"
            >
              {data.title}
            </Link>
          </h3>
          <div className="flex w-full justify-between items-center">
            <div className="grow text-sm text-slate-500 dark:text-slate-400">
              {data.description}
            </div>
            <Link
              className="hidden lg:flex shrink-0 text-gold items-center justify-center w-12 group"
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
