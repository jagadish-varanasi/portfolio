import {
  deleteEpicDraft,
  deleteInitiationDraft,
  deleteReleaseDraft,
} from "@/app/actions";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import React from "react";

export function Alert({
  children,
  draftId,
  projectId,
}: Readonly<{
  children: React.ReactNode;
  draftId: string;
  projectId: string;
}>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            draft and remove from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteEpicDraft}>
            <input name="projectId" value={projectId} type="hidden" />
            <AlertDialogAction type="submit" name="draftId" value={draftId}>
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
