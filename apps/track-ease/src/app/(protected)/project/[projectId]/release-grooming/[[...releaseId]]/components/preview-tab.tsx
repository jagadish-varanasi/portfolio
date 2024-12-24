"use client";
import { EditorContext } from "@/context/EditorContext";
import { EditorContent } from "@tiptap/react";
import React, { useContext, useEffect } from "react";

function PreviewTab() {
  const { editor } = useContext(EditorContext);

  useEffect(() => {
    editor?.setOptions({ editable: false });

    return () => {
      editor?.setOptions({ editable: true });
    };
  }, [editor]);
  return (
    <div className="flex flex-col">
      <div className="grid h-full">
        <div className="min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default PreviewTab;
