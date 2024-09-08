"use client";
import CodingProfile from "@/app/components/coding-profile";
import HobbyCard from "@/app/components/hobby.-card";
import MdxLayout from "@/app/components/mdx-layout";
import Promotion from "@/app/components/promotions";
import React from "react";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleBack = () => {
    history.back();
  };
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="grow">
        <div className="max-w-[700px]">
          <div className="w-full flex">
            <div className="mb-3">
              <div
                className="inline-flex text-yellow-500 rounded-full border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30"
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
              <div className="w-[88px] h-[88px] bg-gray-300"></div>
            </div>
          </div>
          <MdxLayout>{children}</MdxLayout>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <Promotion />
          <HobbyCard />
          <CodingProfile />
        </div>
      </aside>
    </div>
  );
}

export default BlogDetails;
