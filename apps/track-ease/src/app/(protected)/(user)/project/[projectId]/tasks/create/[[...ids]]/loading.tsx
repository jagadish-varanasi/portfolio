import { Skeleton } from "@repo/ui/components/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-[90vh] p-8 mt-5">
      <div className="animate-pulse space-y-6 h-full">
        <div className="h-[20%] w-full bg-gray-300 rounded mb-8"></div>
        <div className="flex h-[80%] w-full space-x-6 mt-5">
          <div className="flex-1 space-y-4">
            <div>
              <div className="h-14 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
              <div className="flex-1 h-14 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-40 w-full bg-gray-300 rounded"></div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
                <div className="h-28 w-3/4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex space-x-4">
                <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
                <div className="h-28 w-3/4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
