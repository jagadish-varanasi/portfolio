import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();
  const document = await req.json();

  if (!session?.user.id) {
    return NextResponse.json(
      { error: "Your are unauthenticated!" },
      { status: 401 }
    );
  }

  try {
    const documentCreated = await prisma.documents.create({
      data: {
        title: document.title,
        initialContent: document.content,
        ownerId: session.user.id,
        projectId: document.projectId,
      },
    });
    return NextResponse.json({ id: documentCreated.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, res: NextResponse) {
  // const searchParams = request.nextUrl.searchParams;
  // const projectId = searchParams.get("projectId");
  // if (!projectId) {
  //   return NextResponse.json(
  //     { message: "Project ID is required" },
  //     { status: 400 }
  //   );
  // }
  // const releases = await prisma.documents.findMany({
  //   where: { projectId },
  //   select: { id: true, title: true },
  // });
  // return NextResponse.json({ releases }, { status: 200 });

  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchQuery") || "";
  const cursor = searchParams.get("cursor");
  const take = searchParams.get("take") || "";

  try {
    const documents = await prisma.documents.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { initialContent: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      take: parseInt(take) + 1, // Fetch one extra record to check if there's a next page
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0, // Skip the cursor record itself
      orderBy: {
        id: "asc",
      },
    });

    const hasNextPage = documents.length > parseInt(take);
    if (hasNextPage) documents.pop(); // Remove the extra record

    return NextResponse.json(
      {
        documents,
        nextCursor: hasNextPage ? documents[documents.length - 1].id : null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
