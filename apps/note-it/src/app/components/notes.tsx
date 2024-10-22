"use client";
import { useState, useEffect } from "react";
import { Input } from "@repo/ui/components/input";
import ThemeSelector from "@repo/ui/components/theme-selector";
import { Button } from "@repo/ui/components/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const initialNote: { id: number; title: string; notes: string } = {
  id: Date.now(),
  title: "Untitled",
  notes: "",
};

type Note = typeof initialNote;

function Notes({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>();
  const router = useRouter();

  const searchParams = useSearchParams();

  const noteId = searchParams.get("noteId");

  const handleAdd = () => {
    setNotes((prev) => [...prev, { ...initialNote, id: Date.now() }]);
  };

  const handleTitle = (id: number | null, title: string) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, title } : note
    );
    setNotes(newNotes);
  };

  const handleDelete = (id: number | null) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleEdit = (id: number | null) => {
    router.push(`?noteId=${id}`);
  };

  useEffect(() => {
    const notes = window.localStorage.getItem("notes");
    if (!noteId && !notes) {
      const id = Date.now();
      setCurrentNote({ ...initialNote, id });
      setNotes([{ ...initialNote, id }]);
      router.push(`?noteId=${id}`);
    } else if (notes) {
      const notesInLocal = JSON.parse(notes);
      setNotes(notesInLocal);
      const currNoteId = noteId ?? notesInLocal[0]?.id;
      const currentNote = notesInLocal.find(
        (note: Note) => note.id === +currNoteId
      );
      if (currentNote) {
        setCurrentNote(currentNote);
      }
    }
  }, [router, noteId]);

  useEffect(() => {
    if (notes.length)
      window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <div className="flex justify-between py-3 px-12 w-full border-b">
        <div className="flex items-center">
          <Image
            src="/images/noteIt.svg"
            alt="leetcode"
            width="25"
            height="25"
          />
          <div className="font-bold">NoteIt</div>
        </div>
        <div className="flex gap-5">
          <Button size="sm" variant="outline" onClick={() => handleAdd()}>
            Add Note
          </Button>
          <ThemeSelector />
        </div>
      </div>
      <div className="md:flex md:flex-row-reverse px-10 pt-5 items-start w-full">
        <div className="md:w-[40%] md:ml-8">
          {notes.map((note) => (
            <div
              className={`border border-gray-300 rounded-md p-2 w-full flex justify-between items-center mb-2 ${note.id === currentNote?.id && "bg-[#1F2937] dark:bg-[#192335] text-white"}`}
              key={note.id}
            >
              <Input
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-0 h-6 w-3/4 bg-inherit text-[16px] font-medium"
                value={note.title}
                onChange={(e) => handleTitle(note.id, e.target.value)}
              />
              <div className="flex gap-4 cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(note.id)}
                >
                  <Pencil2Icon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(note.id)}
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-[60%]">
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Notes;
