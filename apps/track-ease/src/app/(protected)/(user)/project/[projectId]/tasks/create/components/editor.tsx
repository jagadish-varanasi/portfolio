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
import React, { useEffect, useState } from "react";
import Color from "@tiptap/extension-color";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import { Button } from "@repo/ui/components/button";
import TimeAgo from "react-timeago";
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";


function Editor({
  label,
  value,
  onChange,
  data,
}: {
  label: string;
  value?: any;
  onChange?: any;
  data?: { id: string; name: string; date: string };
}) {
  const ac = null;
  const [showToolbar, setShowToolbar] = useState(false);
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
    editorProps: {
      attributes: {
        class:
          "px-2 prose-sm sm:prose-base lg:prose-sm xl:prose-md focus:outline-none h-full mb-12",
      },
    },
    content: value ? JSON.parse(value) : undefined,
    onUpdate({ editor }) {
      onChange(JSON.stringify(editor?.getJSON()));
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    //const data = JSON.parse(ac);
    //  editor?.commands.setContent(data.content);
  }, [ac, editor]);

  if (!editor) return <div>Please wait</div>;

  //   if (!ac) return <div>Details</div>;

  //console.log(JSON.parse(ac));

  return (
    <ScrollArea
      className="w-full whitespace-nowrap rounded-md border min-h-[150px] relative mb-4"
      onMouseOver={() => {
        setShowToolbar(true);
      }}
      onMouseOut={() => {
        setShowToolbar(false);
      }}
    >
      {data && (
        <div className="flex  md:items-center flex-col md:flex-row">
          <div className="pl-2 pt-2 md:p-2 font-semibold text-sm text-gray-500">
            {data?.name}
          </div>
          <div className="px-2 md:py-2 md:px-0 font-light text-xs text-gray-400">
            commented on  <TimeAgo date={data?.date} />
          </div>
        </div>
      )}
      <EditorContent editor={editor} />
      <ScrollBar orientation="vertical" />
      {showToolbar && (
        <div className="absolute bottom-0 left-0">
          <div className="grid gap-1">
            <div>
              <Button
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive("bold") ? "secondary" : "ghost"}
              >
                <BoldIcon size="16" />
              </Button>
              <Button
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive("italic") ? "secondary" : "ghost"}
              >
                <ItalicIcon size="16" />
              </Button>
              <Button
                size="icon"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                variant={editor.isActive("underline") ? "secondary" : "ghost"}
              >
                <UnderlineIcon size="16" />
              </Button>
              <Button
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={"ghost"}
              >
                <LinkIcon size="16" />
              </Button>
              <Button
                size="icon"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive("strike") ? "secondary" : "ghost"}
              >
                <StrikethroughIcon size="16" />
              </Button>
            </div>
          </div>
        </div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default Editor;
