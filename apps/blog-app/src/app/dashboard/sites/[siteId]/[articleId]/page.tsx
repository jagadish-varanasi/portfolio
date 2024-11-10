import { EditArticleForm } from "@/app/components/dashboard/forms/EditArticleForm";
import prisma from "@/libs/db";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Props = {
  params: Promise<{ siteId: string; articleId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EditRoute({ params }: Props) {
  const param = await params;
  const data = await getData(param.articleId);
  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${param.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticleForm data={data} siteId={param.siteId} />
    </div>
  );
}
