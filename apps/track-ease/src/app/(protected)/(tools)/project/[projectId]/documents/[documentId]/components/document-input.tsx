import BackButton from "@/app/(protected)/(user)/project/[projectId]/tasks/components/back-button";
import { putDocumentTitle } from "@/app/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { useStatus } from "@liveblocks/react";
import { toast } from "@repo/ui/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

function DocumentInput({ title, id }: { title: string; id: string }) {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => {
      return putDocumentTitle(id, title);
    },
    onSettled: () => {
      toast({
        title: "Document saved!",
      });
      setIsPending(false);
    },
  });

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;
    setIsPending(true);
    mutate.mutate({ id, title: newValue });
  }, 1500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      <BackButton />
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          className="text-lg px-1.5 cursor-pointer truncate"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          {title}
        </span>
      )}
      {isError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}

export default DocumentInput;
