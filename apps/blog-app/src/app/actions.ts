"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PostSchema, SiteCreationSchema } from "./constants/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import prisma from "@/libs/db";
import { requireUser } from "./libs/requireUser";

export async function CreateSiteAction(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = await parseWithZod(formData, {
    schema: SiteCreationSchema({
      async isSubdirectoryUnique() {
        const existingSubDirectory = await prisma.site.findUnique({
          where: {
            subdirectory: formData.get("subdirectory") as string,
          },
        });
        return !existingSubDirectory;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.site.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });
  return redirect("/dashboard/sites");
}

export async function CreatePostAction(prevState: unknown, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function EditPostActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeleteSite(formData: FormData) {
  const user = await requireUser();

  await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
  });

  return redirect("/dashboard/sites");
}

export async function DeletePost(formData: FormData) {
  const user = await requireUser();

  await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
