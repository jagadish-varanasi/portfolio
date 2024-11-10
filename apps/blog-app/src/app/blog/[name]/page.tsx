import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/libs/db";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Props = {
  params: Promise<{ slug: string; name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogIndexPage({ params }: Props) {
  const param = await params;
  const data = await getData(param.name);
  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.posts.map(
          (item: {
            id: string;
            image?: string;
            title: string;
            smallDescription: string;
            slug: string;
          }) => (
            <Card key={item.id}>
              <Image
                src={item.image ?? "/default.png"}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/${param.name}/${item.slug}`}>
                    Read more
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </>
  );
}
