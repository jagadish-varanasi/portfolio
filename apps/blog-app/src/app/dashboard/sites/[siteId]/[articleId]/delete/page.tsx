import { DeletePost } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";

type Props = {
  params: Promise<{ siteId: string; articleId: string  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DeleteForm({
  params,
}: Props) {
  const param= await params;
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are your absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delelete this article and
            remove all data from our server
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${param.siteId}`}>Cancel</Link>
          </Button>
          <form action={DeletePost}>
            <input type="hidden" name="articleId" value={param.articleId} />
            <input type="hidden" name="siteId" value={param.siteId} />
            <SubmitButton variant="destructive" text="Delete Article" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
