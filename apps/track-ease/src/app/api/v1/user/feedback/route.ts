import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json(
      { error: "Please login to add feedback" },
      { status: 400 }
    );
  }
  const feedback = await req.json();
  await prisma.user.update({
    data: {
      feedbacks: {
        create: { rating: feedback.rating, suggestion: feedback.suggestion },
      },
    },
    where: {
      id: session?.user.id,
    },
  });

  return NextResponse.json({ message: "Saved Successfully" });
}
