import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Liveblocks } from "@liveblocks/node";

const liveBlocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request, res: Response) {
  const session = await auth();

  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  const { room } = await req.json();

  const document = await prisma.documents.findUnique({ where: { id: room } });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  const isOwner = document.ownerId === userId;

  //more rule and throw error here.

  const liveBlockSession = liveBlocks.prepareSession(userId, {
    userInfo: {
      name: session.user.name ?? "Anonymous",
      avatar: session.user.image,
    },
  });

  liveBlockSession.allow(room, liveBlockSession.FULL_ACCESS);

  const { body, status } = await liveBlockSession.authorize();

  return new Response(body, { status });
}
