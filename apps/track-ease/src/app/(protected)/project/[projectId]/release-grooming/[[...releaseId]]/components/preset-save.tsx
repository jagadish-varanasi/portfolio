"use client";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/use-toast";
import { EditorContext } from "@/context/EditorContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function PresetSave({
  label,
  projectId,
  releaseId,
}: {
  label: "Save" | "Save draft";
  projectId: string;
  releaseId: string;
}) {
  const { handleSave, details, handleDraftSave } = useContext(EditorContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const [saveAs, setSaveAs] = useState("");

  useEffect(() => {
    setSaveAs(details?.title);
  }, [details?.title]);

  const type = searchParams.get("type");

  console.log(params, "query", type);

  const handleSubmit = () => {
    setLoading(true);
    if (label === "Save") {
      handleSave().then(() => {
        router.push(`/project/${projectId}/epics`);
        toast({
          title: "Your changes are saved!",
          description: "Your epic created successfully.",
        });
        setLoading(false);
      });
    } else {
      handleDraftSave(
        type === "groom" ? releaseId : "",
        saveAs || details?.title
      ).then(() => {
        router.push(`/project/${projectId}/epics?tab=drafts`);
        toast({
          title: "Your changes are saved!",
          description: "Your epic draft created successfully.",
        });
        setLoading(false);
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>{label} epic</DialogTitle>
          <DialogDescription>
            This will save the current epic state as a final version which can
            be accessed later or share with others for creation of user stories.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoFocus
              disabled={label === "Save"}
              value={saveAs}
              onChange={(e) => setSaveAs(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
