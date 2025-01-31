import prisma from "@/lib/db";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import React from "react";

async function Page({
  params: { projectId },
  searchParams,
}: {
  params: {
    projectId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const projectDetails = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      ProjectOnUsers: { include: { user: true } },
      Epic: { include: { tasks: true } },
    },
  });
  const tasksCount = await prisma.task.aggregate({
    where: { projectId: projectId },
    _count: true,
  });
  const epicsCount = await prisma.epic.aggregate({
    where: { projectId: projectId },
    _count: true,
  });

  return (
    <div>
      <section id="overview" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Total Epics
              </h3>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-neutral-800">
              {epicsCount._count}
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Total Tasks
              </h3>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  ></path>
                </svg>
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-neutral-800">
              {tasksCount._count}
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Team Members
              </h3>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-neutral-800">2</p>
          </div>
          <div className="p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">
                Tasks Status
              </h3>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600">
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
                  ></path>
                </svg>
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">To Do</span>
                <span className="text-sm font-medium text-neutral-800">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">In Progress</span>
                <span className="text-sm font-medium text-neutral-800">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Done</span>
                <span className="text-sm font-medium text-neutral-800">3</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Project Vision
          </h2>
          <p className="text-neutral-600">{projectDetails?.description}</p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          id="el-emmtogxw"
        >
          <div
            className="bg-white p-4 rounded-lg border border-gray-200"
            id="el-895f2p16"
          >
            <h2
              className="text-base font-semibold text-gray-900 mb-3"
              id="el-fqynnumy"
            >
              Team
            </h2>
            <div className="space-y-3" id="el-7i95poxn">
              {projectDetails?.ProjectOnUsers.map((a) => (
                <div
                  key={a.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  id="el-d7kgra21"
                >
                  <div className="flex items-center space-x-2" id="el-bxhhmzs6">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="sai"
                      className="w-8 h-8 rounded-full transition-opacity duration-300 opacity-100"
                      loading="lazy"
                      id="el-gmskdfdf"
                    />
                    <div id="el-gi7ifum4">
                      <p
                        className="font-medium text-sm text-gray-900 capitalize"
                        id="el-gdlgitce"
                      >
                        {a?.user.name}
                      </p>
                      <p
                        className="text-xs text-gray-600 capitalize"
                        id="el-hlbv93vp"
                      >
                        {a?.user.role?.toLocaleLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="bg-white p-4 rounded-lg border border-gray-200"
            id="el-pg8ekvur"
          >
            <div className="mt-6" id="el-55s338le">
              <h2
                className="text-base font-semibold text-gray-900 mb-3"
                id="el-wn7l908n"
              >
                Project Timeline
              </h2>
              <div className="space-y-4" id="el-ceypnmz3">
                <div className="bg-gray-50 p-4 rounded-lg" id="el-nr6h25hv">
                  <div
                    className="flex justify-between items-center mb-2"
                    id="el-j6z6bcks"
                  >
                    <span
                      className="text-sm font-medium text-gray-600"
                      id="el-ahg8ew3o"
                    >
                      Project Duration
                    </span>
                    <span className="text-xs text-gray-500" id="el-5gcgkzl8">
                      30 days left
                    </span>
                  </div>
                  <div
                    className="w-full bg-gray-200 rounded-full h-2"
                    id="el-ntjunt1f"
                  >
                    <div
                      className="bg-blue-600 h-2 rounded-full w-[60%]"
                      id="el-q4eg956i"
                    ></div>
                  </div>
                  <div
                    className="flex justify-between mt-2 text-xs text-gray-500"
                    id="el-3olv8snr"
                  >
                    <span id="el-hordqt2n">Start: Jan 1, 2024</span>
                    <span id="el-ec6vbyrc">End: Mar 1, 2024</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg" id="el-t09keeys">
                  <div
                    className="flex justify-between items-center mb-2"
                    id="el-z7mcs4to"
                  >
                    <span
                      className="text-sm font-medium text-gray-600"
                      id="el-58b42i2l"
                    >
                      Current Sprint
                    </span>
                    <span className="text-xs text-gray-500" id="el-sk6j4ynz">
                      Sprint 2/4
                    </span>
                  </div>
                  <div
                    className="w-full bg-gray-200 rounded-full h-2"
                    id="el-hwbbxd4p"
                  >
                    <div
                      className="bg-green-600 h-2 rounded-full w-[75%]"
                      id="el-lw5mwp55"
                    ></div>
                  </div>
                  <div
                    className="flex justify-between mt-2 text-xs text-gray-500"
                    id="el-tke8as6x"
                  >
                    <span id="el-u8um4lkx">Jan 15, 2024</span>
                    <span id="el-ccftwxih">Jan 29, 2024</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg" id="el-9ijv2j4z">
                  <h3
                    className="text-sm font-medium text-gray-600 mb-3"
                    id="el-jgykc4jn"
                  >
                    Sprint Timeline
                  </h3>
                  <div className="space-y-2" id="el-95ngyv6h">
                    <div className="flex items-center" id="el-bxxnkm42">
                      <div
                        className="w-20 text-xs text-gray-500"
                        id="el-jjyoxekg"
                      >
                        Sprint 1
                      </div>
                      <div
                        className="flex-1 h-6 bg-blue-100 rounded relative"
                        id="el-y0zo8n2x"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-600 rounded w-full"
                          id="el-67n96e28"
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center" id="el-oagpbff1">
                      <div
                        className="w-20 text-xs text-gray-500"
                        id="el-mpkqat84"
                      >
                        Sprint 2
                      </div>
                      <div
                        className="flex-1 h-6 bg-blue-100 rounded relative"
                        id="el-kurkja9p"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-600 rounded w-[75%]"
                          id="el-q6tp2d4p"
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center" id="el-6k12aoz6">
                      <div
                        className="w-20 text-xs text-gray-500"
                        id="el-knflkyum"
                      >
                        Sprint 3
                      </div>
                      <div
                        className="flex-1 h-6 bg-blue-100 rounded relative"
                        id="el-cinnbex5"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-gray-200 rounded w-full"
                          id="el-3djrmxxu"
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center" id="el-rirdq3lb">
                      <div
                        className="w-20 text-xs text-gray-500"
                        id="el-y5jmw6ey"
                      >
                        Sprint 4
                      </div>
                      <div
                        className="flex-1 h-6 bg-blue-100 rounded relative"
                        id="el-y9a59wxp"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-gray-200 rounded w-full"
                          id="el-udjuufa3"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="epics" className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-800">Epics</h2>
          <Button>
            <Plus />
            New Epic
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">
                  Requirements Gathering
                </h3>
                <p className="text-neutral-600 mt-1">
                  Collection and documentation of project requirements
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                In Progress
              </span>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="ml-2 text-sm text-neutral-600">4 tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
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
                <span className="ml-2 text-sm text-neutral-600">2 weeks</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border  p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">
                  User Story Creation
                </h3>
                <p className="text-neutral-600 mt-1">
                  Breaking down epics into manageable user stories
                </p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                Planned
              </span>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="ml-2 text-sm text-neutral-600">3 tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
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
                <span className="ml-2 text-sm text-neutral-600">1 week</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">
                  Sprint Planning
                </h3>
                <p className="text-neutral-600 mt-1">
                  Organization and scheduling of sprint activities
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Not Started
              </span>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="ml-2 text-sm text-neutral-600">4 tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-neutral-500"
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
                <span className="ml-2 text-sm text-neutral-600">3 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
