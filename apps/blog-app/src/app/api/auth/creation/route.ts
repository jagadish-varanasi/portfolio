import prisma from "@/libs/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong");
  }

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  console.log(dbUser, "dbUser");

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect("http://localhost:3005/dashboard");
}
