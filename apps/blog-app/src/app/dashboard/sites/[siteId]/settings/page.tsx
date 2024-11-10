import { DeleteSite } from "@/app/actions";
import { UploadImageForm } from "@/app/components/dashboard/forms/UploadImageForm";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ siteId: string; articleId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SettingsSiteRoute({ params }: Props) {
  const param = await params;
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Link href={`/dashboard/sites/${param.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>
      <UploadImageForm siteId={param.siteId} />
      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription>
            This will delete your site and all articles associated with it.
            Click the button below to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSite}>
            <input type="hidden" name="siteId" value={param.siteId} />
            <SubmitButton text="Delete Everything" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
