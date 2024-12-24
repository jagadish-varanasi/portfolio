import React from "react";
import { TeamMembers } from "./components/team-members";

function Page() {
  return (
    <div className="flex w-full">
      <div className="w-[70%]">
        <TeamMembers />
      </div>
    </div>
  );
}

export default Page;
