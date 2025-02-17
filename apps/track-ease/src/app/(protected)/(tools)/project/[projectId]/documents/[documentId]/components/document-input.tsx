import BackButton from "@/app/(protected)/(user)/project/[projectId]/tasks/components/back-button";
import React from "react";
import { BsCloudCheck } from "react-icons/bs";

function DocumentInput() {
  return (
    <div className="flex items-center gap-2">
      <BackButton />
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <BsCloudCheck />
    </div>
  );
}

export default DocumentInput;
