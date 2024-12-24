"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ReleaseFormValues } from "./(protected)/project/[projectId]/(explorer)/releases/components/release-form";
import { ProjectFormValues } from "./(protected)/admin/project/create/page";
import { InitiationFormValues } from "./(protected)/project/[projectId]/(explorer)/requirement-gathering/components/initiation-form";
import { InitiationDraftFormValues } from "./(protected)/project/[projectId]/(explorer)/epics/components/initiation-form";

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
  const users = await prisma.project.create({
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
  return users;
}

export async function createRelease(
  projectId: string,
  newRelease: ReleaseFormValues
) {
  console.log(newRelease, projectId);
  await prisma.release.create({
    data: {
      projectId: projectId,
      description: newRelease.description,
      name: newRelease.name,
    },
  });
  if (newRelease.id) {
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
      },
      create: {
        name: draftData.name,
        description: draftData.description,
        projectId: projectId,
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

export async function getEpicDetails(epicId: string | null) {
  if (!epicId) {
    const allEpic = await prisma.epic.findMany({
      select: { id: true, title: true },
    });
    return allEpic;
  }
  const epic = await prisma.epic.findUnique({
    where: { id: epicId },
    select: { id: true, title: true },
  });
  return epic;
}

export interface Task {
  title: string;
  description: string;
  status: string;
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
