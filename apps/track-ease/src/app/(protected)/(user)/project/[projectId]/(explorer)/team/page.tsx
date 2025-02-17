import React from "react";
import { TeamMembers } from "./components/team-members";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";

function Page() {
  return (
    <div className="w-full">
      <div className="mt-8 p-6 border rounded-lg">
        <h3 className="text-lg font-medium text-neutral-800 mb-4">
          Team Performance
        </h3>
        <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-neutral-600">
                Total Tasks
              </h4>
              <p className="text-2xl font-semibold text-neutral-800 mt-1">11</p>
              <div className="mt-2 text-sm text-neutral-500">
                Across all sprints
              </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-neutral-600">
                Completion Rate
              </h4>
              <p className="text-2xl font-semibold text-neutral-800 mt-1">
                27%
              </p>
              <div className="mt-2 text-sm text-neutral-500">
                3 of 11 tasks completed
              </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-neutral-600">
                Active Tasks
              </h4>
              <p className="text-2xl font-semibold text-neutral-800 mt-1">8</p>
              <div className="mt-2 text-sm text-neutral-500">
                Currently in progress
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="team" className="p-6 border rounded-lg mt-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-800">
            Team Members
          </h2>
          <Button>
            <Plus />
            Request Member
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt="sai"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-neutral-800">sai</p>
                  <p className="text-sm text-neutral-600">6 tasks assigned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-neutral-800">33%</p>
                <p className="text-sm text-neutral-600">Completion rate</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt="ram"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-neutral-800">ram</p>
                  <p className="text-sm text-neutral-600">5 tasks assigned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-neutral-800">20%</p>
                <p className="text-sm text-neutral-600">Completion rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="w-[70%]">
        <TeamMembers />
      </div> */}
    </div>
  );
}

export default Page;
