"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@repo/ui/components/input";
import ThemeSelector from "@repo/ui/components/theme-selector";
import { Button } from "@repo/ui/components/button";
import TailwindAdvancedEditor from "@repo/rich-text-editor/editor";
import { Pencil2Icon } from "@radix-ui/react-icons";

const initialNote = { title: "Untitled", notes: "" };

export default function Home() {
  const [notes, setNotes] = useState([initialNote]);

  const handleAdd = () => {
    setNotes((prev) => [...prev, initialNote]);
  };

  return (
    <div className="flex p-5 gap-5 items-start w-full">
      <div className="w-[60%]">
        <div className="flex items-center mb-5">
          <Image
            src="/images/noteIt.svg"
            alt="leetcode"
            width="25"
            height="25"
          />
          <div className="font-bold">NoteIt</div>
          {/* <Input value="hello" className="w-[500px] ml-10" /> */}
        </div>
        <TailwindAdvancedEditor showActions={false} />
      </div>
      <div className="w-[40%]">
        <div className="w-full mb-5 flex justify-end gap-5">
          <Button size="sm" variant="outline" onClick={handleAdd}>
            Add Note
          </Button>
          <ThemeSelector />
        </div>
        {notes.map((note, index) => (
          <div
            className="border border-gray-300 rounded-md p-4 w-full flex justify-between items-center mb-2"
            key={index}
          >
            <div>{note.title}</div>
            <div className="cursor-pointer">
              <Pencil2Icon height="16px" width="16px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
