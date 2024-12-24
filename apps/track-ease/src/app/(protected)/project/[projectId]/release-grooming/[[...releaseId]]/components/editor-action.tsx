"use client";
import { Button } from "@repo/ui/components/button";
import { EditorContext } from "@/context/EditorContext";
import React, { useContext } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AtSignIcon,
  BoldIcon,
  CodeIcon,
  Columns,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  Link,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  Rows,
  StrikethroughIcon,
  Table,
  Underline,
  UndoIcon,
} from "lucide-react";
import { ModelSelector } from "./model-selector";
import { models, types } from "../data/models";
import { Label } from "@repo/ui/components/label";

function EditorActions() {
  const { editor } = useContext(EditorContext);

  if (!editor) return <div>Please wait...</div>;

  return (
    <div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label>History</Label>
          <div>
            <Button
              size="icon"
              onClick={() => editor.chain().focus().undo().run()}
              variant={editor.isActive("bold") ? "secondary" : "ghost"}
            >
              <UndoIcon size="16" />
            </Button>
            <Button
              size="icon"
              onClick={() => editor.chain().focus().redo().run()}
              variant={editor.isActive("italic") ? "secondary" : "ghost"}
            >
              <RedoIcon size="16" />
            </Button>
          </div>
        </div>
        <div className="grid gap-1">
          <Label>Font</Label>
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
              <Underline size="16" />
            </Button>
            <Button
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              variant={"ghost"}
            >
              <Link size="16" />
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
        <div className="grid  gap-1">
          <Label>Headings</Label>
          <div>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              variant={
                editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
              }
            >
              <Heading1Icon size="20" />
            </Button>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              variant={
                editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
              }
            >
              <Heading2Icon size="19" />
            </Button>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              variant={
                editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
              }
            >
              <Heading3Icon size="18" />
            </Button>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              variant={
                editor.isActive("heading", { level: 4 }) ? "secondary" : "ghost"
              }
            >
              <Heading4Icon size="17" />
            </Button>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              variant={
                editor.isActive("heading", { level: 5 }) ? "secondary" : "ghost"
              }
            >
              <Heading5Icon size="16" />
            </Button>
            <Button
              size="icon"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              variant={
                editor.isActive("heading", { level: 6 }) ? "secondary" : "ghost"
              }
            >
              <Heading6Icon size="15" />
            </Button>
          </div>
        </div>
        <div className="grid gap-1">
          <Label>Align</Label>
          <div>
            <Button
              size="icon"
              onClick={
                editor.isActive({ textAlign: "left" })
                  ? () => editor.chain().focus().unsetTextAlign().run()
                  : () => editor.chain().focus().setTextAlign("left").run()
              }
              variant={
                editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"
              }
            >
              <AlignLeftIcon size="16" />
            </Button>
            <Button
              onClick={
                editor.isActive({ textAlign: "right" })
                  ? () => editor.chain().focus().unsetTextAlign().run()
                  : () => editor.chain().focus().setTextAlign("right").run()
              }
              variant={
                editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
              }
              size="icon"
            >
              <AlignRightIcon size="16" />
            </Button>
            <Button
              onClick={
                editor.isActive({ textAlign: "center" })
                  ? () => editor.chain().focus().unsetTextAlign().run()
                  : () => editor.chain().focus().setTextAlign("center").run()
              }
              variant={
                editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
              }
              size="icon"
            >
              <AlignCenterIcon size="16" />
            </Button>
          </div>
        </div>
        <div className="grid gap-1">
          <Label>List</Label>
          <div>
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
              size="icon"
            >
              <ListOrderedIcon size="16" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant={editor.isActive("bulletedList") ? "secondary" : "ghost"}
              size="icon"
            >
              <ListIcon size="16" />
            </Button>
          </div>
        </div>
        <div className="grid gap-1">
          <Label>Other</Label>
          <div>
            <Button variant={"ghost"} size="icon">
              <AtSignIcon size="16" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
              size="icon"
            >
              <QuoteIcon size="16" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
              size="icon"
            >
              <CodeIcon size="16" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <ModelSelector types={types} models={models} />
      </div>
    </div>
  );
}

export default EditorActions;
