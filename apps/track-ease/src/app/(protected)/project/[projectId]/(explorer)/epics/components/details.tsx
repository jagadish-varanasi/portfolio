"use client";
import TextStyle from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Text from "@tiptap/extension-text";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Gapcursor from "@tiptap/extension-gapcursor";
import Mention from "@tiptap/extension-mention";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import suggestion from "@tiptap/suggestion";
import React, { useEffect } from "react";
import Color from "@tiptap/extension-color";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

function Details({ ac }: { ac: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      Document,
      Text,
      TextStyle,
      Underline,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: null,
        },
      }),
      CodeBlock,
      Blockquote,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ListItem,
      OrderedList,
      BulletList,
    ],
    editable: false,
    editorProps: {
      attributes: {
        class:
          "p-4 prose prose-auto prose-sm sm:prose-base lg:prose-sm xl:prose-md focus:outline-none h-full",
      },
    },
  });

  useEffect(() => {
    if (!editor || !ac) {
      return;
    }
    const data = JSON.parse(ac);
    editor?.commands.setContent(data.content);
  }, [ac, editor]);

  if (!ac) return <div>Details</div>;

  console.log(JSON.parse(ac));

  return (
    <ScrollArea className="w-auto whitespace-nowrap rounded-md border h-[90%] mt-5">
      <EditorContent editor={editor} />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default Details;
