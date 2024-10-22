"use client";
import TailwindAdvancedEditor from "@repo/rich-text-editor/editor";
import { useSearchParams } from "next/navigation";
import { defaultNote } from "../constants/default-note";

export default function Home() {
  const searchParams = useSearchParams();

  const noteId = searchParams.get("noteId") as string;

  console.log(noteId);

  return (
    <TailwindAdvancedEditor
      showActions={false}
      noteId={+noteId}
      defaultValue={defaultNote}
    />
  );
}
