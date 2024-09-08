"use client";

import Image from "next/image";
import React from "react";

function Header({ image }: { image: string }) {
  const handleBack = () => {
    history.back();
  };
  return (
    <div className="w-full flex">
      <div className="mb-3">
        <div
          className="inline-flex text-yellow-500 rounded-full border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 cursor-pointer"
          onClick={handleBack}
        >
          <span className="sr-only">Back</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
            <path
              className="fill-current"
              d="m16.414 17 3.293 3.293-1.414 1.414L13.586 17l4.707-4.707 1.414 1.414z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full flex justify-end -translate-y-8">
        <div className="w-[88px] h-[88px] relative">
          <Image
            src={image}
            alt={"blog-image"}
            layout="fill"
            style={{ height: "100%", width: "100%" }}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
