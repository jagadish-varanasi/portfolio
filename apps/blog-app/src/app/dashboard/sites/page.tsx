import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import React from "react";
import prisma from "@/libs/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Image from "next/image";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });
  return data;
}

async function SitesPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user.id);
  console.log(data);
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You dont have any Sites created"
          description="You currently dont have any Sites. Please create some so that you can
      see them right here!"
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? "/placeholder-image.webp"}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`./sites/${item.id}`}>View Articles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default SitesPage;
