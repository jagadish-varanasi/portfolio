import React from "react";

function Page() {
  return (
    <div>
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <h3 className="text-lg font-medium text-neutral-800">
                Sprint 1 - Requirements Analysis
              </h3>
            </div>
            <p className="text-neutral-600 mt-1">June 1 - June 14, 2024</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            Active
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">To Do</p>
            <p className="text-xl font-semibold text-neutral-800 mt-1">2</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">In Progress</p>
            <p className="text-xl font-semibold text-neutral-800 mt-1">3</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Done</p>
            <p className="text-xl font-semibold text-neutral-800 mt-1">1</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="sai"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://avatar.iran.liara.run/public"
                alt="ram"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <span className="text-sm text-neutral-600">2 assignees</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-600">Progress</span>
            <div className="w-32 h-2 bg-neutral-200 rounded-full">
              <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-neutral-600">50%</span>
          </div>
        </div>
      </div>
      <section id="analytics" className="p-6 mt-4 border rounded-lg">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">
            Analytics Dashboard
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-neutral-200/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Tasks Completion Rate
              </h3>
              <span className="text-green-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-neutral-800 mt-2">27%</p>
            <p className="text-sm text-neutral-500 mt-1">3 of 11 completed</p>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Average Time per Task
              </h3>
              <span className="text-blue-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-neutral-800 mt-2">
              2.5 days
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Average completion time
            </p>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Sprint Velocity
              </h3>
              <span className="text-purple-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-neutral-800 mt-2">5.5</p>
            <p className="text-sm text-neutral-500 mt-1">Tasks per sprint</p>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Team Capacity
              </h3>
              <span className="text-yellow-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-neutral-800 mt-2">2</p>
            <p className="text-sm text-neutral-500 mt-1">Active team members</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">
              Task Status Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">To Do</span>
                  <span className="text-sm font-medium text-neutral-800">
                    5 tasks
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-[45%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">In Progress</span>
                  <span className="text-sm font-medium text-neutral-800">
                    3 tasks
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-[27%] h-full bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">Done</span>
                  <span className="text-sm font-medium text-neutral-800">
                    3 tasks
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-[27%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">
              Epic Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">
                    Requirements Gathering
                  </span>
                  <span className="text-sm font-medium text-neutral-800">
                    50%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-1/2 h-full bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">
                    User Story Creation
                  </span>
                  <span className="text-sm font-medium text-neutral-800">
                    30%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-[30%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">
                    Sprint Planning
                  </span>
                  <span className="text-sm font-medium text-neutral-800">
                    10%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-[10%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
