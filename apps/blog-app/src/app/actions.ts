"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { siteSchema } from "./constants/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import prisma from "@/libs/db";

export async function CreateSiteAction(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, { schema: siteSchema });

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
