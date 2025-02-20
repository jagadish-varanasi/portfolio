"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProjectFormValues } from "./(protected)/(admin)/admin/project/create/page";
import {
  InitiationFormValues,
  InitiationDraftFormValues,
} from "./(protected)/(user)/project/[projectId]/(explorer)/(details)/epics/components/initiation-form";
import { ReleaseFormValues } from "./(protected)/(user)/project/[projectId]/(explorer)/(details)/releases/components/release-form";

export async function deleteTask(taskId: number) {
  try {
    await prisma.task.delete({ where: { id: taskId } });
    revalidatePath("/dashboard");
    return {
      message: "Delete successful",
    };
  } catch {
    return {
      message: "Please check your task",
    };
  }
}

export async function deleteProject(id: string) {
  try {
    console.log(id, "Delete ID");
    await prisma.project.delete({ where: { id: id } });
    revalidatePath("/dashboard");
    return {
      message: "Delete successful",
    };
  } catch {
    return {
      message: "Please check your project",
    };
  }
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  return users;
}

enum ProjectRole {
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export async function createProject(project: ProjectFormValues) {
  const { name, description, members, startDate, endDate, owners } = project;
  const session = await auth();
  console.log(name, description, members);
  if (session?.user?.role !== "ADMIN") return;
  await prisma.project.create({
    data: {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      ProjectOnUsers: {
        createMany: {
          data: [
            ...(members?.map((mem: any) => ({
              userId: mem.id,
              assignedBy: session.user.email as string,
              role: ProjectRole.MEMBER,
            })) ?? []),
            ...(owners?.map((mem: any) => ({
              userId: mem.id,
              assignedBy: session.user.email as string,
              role: ProjectRole.OWNER,
            })) ?? []),
          ],
        },
      },
    },
  });
  revalidatePath("/dashboard");
  return redirect("/dashboard");
}

export async function createRelease(
  projectId: string,
  newRelease: ReleaseFormValues,
  isEdit: boolean
) {
  console.log(newRelease, projectId);
  await prisma.release.upsert({
    where: { id: newRelease.id || "" },
    create: {
      projectId: projectId,
      description: newRelease.description,
      name: newRelease.name,
      startDate: newRelease.duration.from,
      endDate: newRelease.duration?.to,
      EpicOnReleases: {
        create: newRelease.epics?.map((epic) => ({
          epic: { connect: { id: epic.value } },
        })),
      },
    },
    update: {
      projectId: projectId,
      description: newRelease.description,
      name: newRelease.name,
      startDate: newRelease.duration.from,
      endDate: newRelease.duration?.to,
      EpicOnReleases: {
        deleteMany: {}, // Remove all existing connections
        create: newRelease.epics?.map((epic) => ({
          epic: { connect: { id: epic.value } },
        })),
      },
    },
  });
  if (newRelease.id && !isEdit) {
    await prisma.releaseDraft.delete({ where: { id: newRelease.id } });
  }
  revalidatePath(`/project/${projectId}/releases`);
}

export async function createInitiation(
  projectId: string,
  newInitiation: InitiationFormValues
) {
  console.log(newInitiation, projectId);
  await prisma.initiation.create({
    data: {
      projectId: projectId,
      description: newInitiation.description,
      name: newInitiation.name,
      highLevelRequirements: {
        createMany: {
          data: newInitiation.highLevelRequirements?.map(
            ({ requirement, priority }) => ({
              requirement,
              priority,
            })
          ),
        },
      },
    },
  });
  if (newInitiation.id) {
    await prisma.initiationDraft.delete({ where: { id: newInitiation.id } });
  }
  revalidatePath(`/project/${projectId}/releases`);
}

export async function createInitiationDraft(
  projectId: string,
  draftData: InitiationDraftFormValues
) {
  console.log(draftData, projectId);
  if (!draftData.highLevelRequirements) return;

  try {
    const upsertedDraft = await prisma.initiationDraft.upsert({
      where: { id: draftData.id || "" }, // If draftId is null, this will fail the match and trigger a create operation
      update: {
        name: draftData.name,
        description: draftData.description,
        highLevelRequirements: {
          upsert: draftData.highLevelRequirements.map((req) => ({
            where: { id: req.id || "" },
            update: {
              requirement: req.requirement,
              priority: req.priority,
            },
            create: {
              requirement: req.requirement,
              priority: req.priority,
            },
          })),
        },
      },
      create: {
        name: draftData.name,
        description: draftData.description,
        projectId: projectId,
        highLevelRequirements: {
          createMany: {
            data: draftData.highLevelRequirements.map((req) => ({
              requirement: req.requirement,
              priority: req.priority,
            })),
          },
        },
      },
    });
    return upsertedDraft;
  } catch (error) {
    console.error("Failed to upsert release draft:", error);
    throw error;
  } finally {
    revalidatePath(`/project/${projectId}/releases`);
  }
}

export async function createReleaseDraft(
  projectId: string,
  draftData: ReleaseFormValues
) {
  console.log(draftData, projectId);
  try {
    const upsertedDraft = await prisma.releaseDraft.upsert({
      where: { id: draftData.id || "" }, // If draftId is null, this will fail the match and trigger a create operation
      update: {
        name: draftData.name,
        description: draftData.description,
        startDate: draftData.duration.from,
        endDate: draftData.duration?.to,
        EpicOnReleaseDraft: {
          deleteMany: {}, // Remove all existing connections
          create: draftData.epics?.map((epic) => ({
            epic: { connect: { id: epic.value } },
          })),
        },
      },
      create: {
        name: draftData.name,
        description: draftData.description,
        projectId: projectId,
        startDate: draftData.duration.from,
        endDate: draftData.duration?.to,
        EpicOnReleaseDraft: {
          create: draftData.epics?.map((epic) => ({
            epic: { connect: { id: epic.value } },
          })),
        },
      },
    });
    return upsertedDraft;
  } catch (error) {
    console.error("Failed to upsert release draft:", error);
    throw error;
  } finally {
    revalidatePath(`/project/${projectId}/releases`);
  }
}

const schema = z.object({
  draftId: z.string({
    invalid_type_error: "DraftId is required",
  }),
  projectId: z.string({
    invalid_type_error: "ProjectId is required",
  }),
});

export async function deleteReleaseDraft(formData: FormData): Promise<any> {
  const validatedFields = schema.safeParse({
    draftId: formData.get("draftId"),
    projectId: formData.get("projectId"),
  });
  console.log(validatedFields.data?.draftId);
  console.log(formData.get("draftId"), "draft action");
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await prisma.releaseDraft.delete({
    where: { id: validatedFields.data.draftId },
  });
  revalidatePath(`/project/${validatedFields.data.projectId}/release`);
}

export async function deleteRelease(formData: FormData): Promise<any> {
  const validatedFields = schema.safeParse({
    releaseId: formData.get("releaseId"),
    projectId: formData.get("projectId"),
  });
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log(validatedFields, "DDRRR");
  try {
    await prisma.release.delete({
      where: { id: validatedFields.data.draftId },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/project/${validatedFields.data.projectId}/release`);
}

export async function deleteInitiationDraft(formData: FormData): Promise<any> {
  const validatedFields = schema.safeParse({
    draftId: formData.get("draftId"),
    projectId: formData.get("projectId"),
  });
  console.log(validatedFields.data?.draftId);
  console.log(formData.get("draftId"), "draft action");
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await prisma.initiationDraft.delete({
    where: { id: validatedFields.data.draftId },
  });
  revalidatePath(
    `/project/${validatedFields.data.projectId}/requirement-gathering`
  );
}

export async function deleteEpicDraft(formData: FormData): Promise<any> {
  const validatedFields = schema.safeParse({
    draftId: formData.get("draftId"),
    projectId: formData.get("projectId"),
  });
  console.log(validatedFields.data?.draftId);
  console.log(formData.get("draftId"), "draft action");
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await prisma.epicDraft.delete({
    where: { id: validatedFields.data.draftId },
  });
  revalidatePath(
    `/project/${validatedFields.data.projectId}/requirement-gathering`
  );
}

export async function saveEpic(data: any) {
  console.log(data, "data");
  await prisma.epic.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      highLevelRequirements: {
        connect: data.highLevelRequirements?.map(({ id }: any) => ({
          id,
        })),
      },
      document: data.document,
    },
  });

  if (data?.id) {
    await prisma.epicDraft.delete({ where: { id: data.id } });
  }
}

export async function saveEpicDraft(data: any) {
  console.log(JSON.stringify(data), "data");
  try {
    const upsertedData = await prisma.epicDraft.upsert({
      where: { id: data.id || "" },
      update: {
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        initiationId: data?.initiationId,
        highLevelRequirements: {
          connect: data.highLevelRequirements?.map(({ id }: any) => ({
            id,
          })),
        },
        document: data.document,
      },
      create: {
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        initiationId: data?.initiationId,
        highLevelRequirements: {
          connect: data.highLevelRequirements?.map(({ id }: any) => ({
            id,
          })),
        },
        document: data.document,
      },
    });
    return;
  } catch (error) {
    console.error("Failed to upsert release draft:", error);
    throw error;
  }
}

export async function getMembers(projectId: string) {
  const members = await prisma.projectOnUsers.findMany({
    where: { projectId: projectId },
    select: { user: { select: { id: true, email: true } } },
  });
  return members;
}

export async function getEpicDetails(
  projectId: string,
  epicId: string | null,
  sprintId: string | null
) {
  if (!epicId && sprintId) {
    const release = await prisma.sprint.findUnique({
      select: { releaseId: true },
      where: { id: sprintId, projectId },
    });
    const epics = await prisma.release.findMany({
      select: { EpicOnReleases: { include: { epic: true } } },
      where: { id: release?.releaseId },
    });
    return epics
      .flatMap((epic) => epic.EpicOnReleases)
      .map((task) => ({
        id: task.epic.id,
        title: task.epic.title,
      }));
  }

  const epic = epicId
    ? await prisma.epic.findUnique({
        where: { id: epicId, projectId },
        select: { id: true, title: true },
      })
    : await prisma.epic.findMany({
        where: { projectId },
        select: { id: true, title: true },
      });

  return epic;
}

export async function getUserStoriesForSprint(sprintId: string | null) {
  console.log(sprintId, "SPRINT-ID-DATA");
  if (sprintId) {
    const tasks = await prisma.sprint.findUnique({
      select: { tasks: true },
      where: { id: sprintId },
    });
    return tasks?.tasks
      .filter((task) => task.issueType === "USERSTORY")
      .map((task) => ({
        id: task.id,
        title: task.title,
      }));
  }
  throw new Error("Something went wrong!");
}

export async function getSprintDetails(sprintId: string | null) {
  if (!sprintId) {
    throw Error("Sprint not found!");
  }
  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
    select: { name: true },
  });
  return sprint;
}

export interface Task {
  title: string;
  description: string;
  status: "TODO" | "INPROGRESS" | "DONE";
  priority: string;
  issueType: string;
  label: string;
  projectId: string | null;
  userId: string;
  parentTaskId: number | null;
  epicId: string | null;
  startDate: string;
  endDate: string;
}

export async function createTask(task: Task) {
  console.log(task);
  const taskCreated = await prisma.task.create({
    data: {
      title: task.title,
      description: "aaaa",
      status: task.status,
      issueType: "TASK",
      priority: task.priority,
      userId: task.userId,
      projectId: task.projectId,
      label: task.label,
      startDate: task.startDate,
      endDate: task.endDate,
      storyPoints: 10,
    },
  });
  return taskCreated;
}

export interface Sprint {
  sprintId?: string;
  releaseId: string;
  name: string;
  description: string;
  sprintDuration: {
    from: Date;
    to?: Date;
  };
  tasks?: Array<{ value: number; label: string }>;
}

export async function createSprint(sprint: Sprint, projectId: string) {
  const session = await auth();
  if (!session?.user.id) {
    throw Error("User is not logged in");
  }
  try {
    await prisma.sprint.upsert({
      where: { id: sprint?.sprintId || "" },
      create: {
        releaseId: sprint.releaseId,
        name: sprint.name,
        description: sprint.description,
        startDate: sprint.sprintDuration.from,
        endDate: sprint.sprintDuration.to,
        tasks: {
          connect: sprint.tasks?.map((task) => ({ id: task.value })),
        },
        userId: session?.user.id,
        projectId,
      },
      update: {
        releaseId: sprint.releaseId,
        name: sprint.name,
        description: sprint.description,
        startDate: sprint.sprintDuration.from,
        endDate: sprint.sprintDuration.to,
        tasks: {
          set: sprint.tasks?.map((task) => ({ id: task.value })),
        },
        userId: session?.user.id,
        projectId,
      },
    });
    revalidatePath(`/project/${projectId}/sprint`);
    return { message: "Sprint Created Successfully" };
  } catch (error) {
    console.log(error, "Sprint error");
    throw Error("Something went wrong!");
  }
}

export async function createChat({ title }: { title: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    throw Error("Unauthorized");
  }

  const { chatId } = await prisma.chat.create({
    data: { title, userId: session.user.id },
  });

  return { id: chatId };
}

export async function deleteChat({ id }: { id: number }) {
  const session = await auth();
  if (!session?.user?.id) {
    throw Error("Unauthorized");
  }
  const { chatId } = await prisma.chat.delete({ where: { chatId: id } });

  return { id: chatId };
}

export async function AddMessage({
  chatId,
  content,
}: {
  chatId: number;
  content: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw Error("Unauthorized");
  }
  console.log(content, "CONTENT");
  const message = await prisma.message.create({
    data: { chatId, content, role: "ASSISTANT" },
  });

  return { id: message };
}

export async function getHighLevelRequirements(
  useCase: "epics" | "requirements",
  type: "saved" | "drafts",
  id: string
) {
  try {
    let data;
    if (useCase === "requirements") {
      if (type === "saved") {
        data = await prisma.initiation.findFirst({
          where: { id },
          include: {
            highLevelRequirements: {
              select: { id: true, requirement: true, priority: true },
            },
          },
        });
        return data;
      }
      data = await prisma.initiationDraft.findFirst({
        where: { id },
        include: {
          highLevelRequirements: {
            select: { id: true, requirement: true, priority: true },
          },
        },
      });
    } else if (useCase === "epics") {
      if (type === "saved") {
        const data = await prisma.epic.findFirst({
          where: { id },
          include: {
            highLevelRequirements: {
              select: { id: true, requirement: true, priority: true },
            },
          },
        });
        return data;
      }
      data = await prisma.epicDraft.findFirst({
        where: { id },
        include: {
          highLevelRequirements: {
            select: { id: true, requirement: true, priority: true },
          },
        },
      });
    }
    return data;
  } catch (err) {
    throw Error("Something went wrong!");
  }
}

export async function releaseDetails(type: "drafts" | "saved", id: string) {
  try {
    if (type !== "drafts")
      return await prisma.release.findFirst({
        where: { id },
        include: { sprints: true, EpicOnReleases: { include: { epic: true } } },
      });

    // return await prisma.releaseDraft.findFirst({
    //   where: { id },
    //   include: { EpicOnReleases: true, sprints: true },
    // });
  } catch (err) {
    throw Error("Something went wrong!");
  }
}

export async function getSprintBoardDetails(id: string) {
  try {
    return await prisma.sprint.findFirst({
      where: { id },
      include: {
        release: { select: { name: true } },
        tasks: {
          select: {
            status: true,
            title: true,
            id: true,
            Epic: { select: { title: true, id: true } },
            childTasks: { select: { title: true, id: true, status: true } },
          },
          where: {
            issueType: "USERSTORY",
          },
        },
      },
    });
  } catch (err) {
    throw Error("Something went wrong!");
  }
}

export async function getInitiationDetails(id: string) {
  try {
    return await prisma.initiation.findFirst({
      where: { id },
      include: { highLevelRequirements: true },
    });
  } catch {
    throw Error("Something went wrong!");
  }
}

export async function getEpicCompleteDetails(id: string) {
  try {
    return await prisma.epic.findFirst({
      where: { id },
      include: { highLevelRequirements: true },
    });
  } catch {
    throw Error("Something went wrong!");
  }
}

export async function getReleaseDetails(id: string) {
  try {
    return await prisma.release.findFirst({
      where: { id },
      include: {
        EpicOnReleases: { select: { epic: { select: { title: true } } } },
        sprints: true,
      },
    });
  } catch {
    throw Error("Something went wrong!");
  }
}

export async function getMyTasks(projectId: string) {
  const session = await auth();
  if (!session?.user?.id || !projectId) {
    throw Error("Something went wrong!");
  }
  try {
    return await prisma.task.findMany({
      where: { userId: session?.user.id, projectId },
      select: {
        id: true,
        title: true,
        status: true,
        storyPoints: true,
      },
    });
  } catch {
    throw Error("Something went wrong!");
  }
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({});

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name ?? user.email ?? "Anonymous",
    avatar: user.image ?? "",
  }));

  return formattedUsers;
}

export async function getAllDocumentsByIds(ids: string[]) {
  const documents = await prisma.documents.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      title: true,
    },
  });
  return documents;
}

export async function putDocumentTitle(id: string, title: string) {
  return await prisma.documents.update({ where: { id }, data: { title } });
}
