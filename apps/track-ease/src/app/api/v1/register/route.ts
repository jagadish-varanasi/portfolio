import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, name, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        error: "Missing name, email, password",
      },
      { status: 200 }
    );
  }
  const exist = await prisma.user.findUnique({ where: { email: email } });

  if (exist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
