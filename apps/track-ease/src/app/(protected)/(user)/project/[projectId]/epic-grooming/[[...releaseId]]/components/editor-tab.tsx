"use client";
import React, { useCallback, useContext } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";

import { EditorContext } from "@/context/EditorContext";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  Link,
  LinkIcon,
  ListIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UnlinkIcon,
} from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { ListBulletIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";

function EditorTab() {
  const { editor } = useContext(EditorContext);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return <div>SWW</div>;

  return (
    <div className="min-h-[400px] rounded-md border lg:min-h-[700px] py-5 pl-5">
      <EditorContent editor={editor} className="flex-1" />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white border border-gray-1 rounded-lg shadow-custom flex items-center p-1 gap-1">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              variant={editor.isActive("bold") ? "secondary" : "ghost"}
              size={"icon"}
            >
              <BoldIcon size="16px" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              variant={editor.isActive("italic") ? "secondary" : "ghost"}
              size={"icon"}
            >
              <ItalicIcon size="16px" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              variant={editor.isActive("strike") ? "secondary" : "ghost"}
              size={"icon"}
            >
              <StrikethroughIcon size="16px" />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              variant={editor.isActive("underline") ? "secondary" : "ghost"}
              size={"icon"}
            >
              <UnderlineIcon size="16px" />
            </Button>
            <Button
              onClick={
                editor.isActive("link")
                  ? () => editor.chain().focus().unsetLink().run()
                  : setLink
              }
              variant={editor.isActive("link") ? "secondary" : "ghost"}
              size={"icon"}
            >
              {editor.isActive("link") ? (
                <UnlinkIcon size="16px" />
              ) : (
                <LinkIcon size="16px" />
              )}
            </Button>
            {/* <Button
              variant={editor.isActive("link") ? "secondary" : "ghost"}
              onClick={}
              disabled={!editor.isActive("link")}
            ></Button> */}
            <Button
              size={"icon"}
              variant={editor.isActive("color") ? "secondary" : "ghost"}
            >
              <div id="swatch">
                <Input
                  id="color"
                  type="color"
                  onInput={(event: any) =>
                    editor.chain().focus().setColor(event.target.value).run()
                  }
                  value={editor.getAttributes("textStyle").color}
                  data-testid="setColor"
                />
              </div>
            </Button>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          className="floating-menu p-2"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            variant={"ghost"}
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
            size="icon"
          >
            <Heading1Icon size="16px" />
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            variant={"ghost"}
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
            size="icon"
          >
            <Heading2Icon size="16px" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant={"ghost"}
            className={editor.isActive("bulletList") ? "is-active" : ""}
            size="icon"
          >
            <ListIcon size="16px" />
          </Button>
        </FloatingMenu>
      )}
    </div>
  );
}

export default EditorTab;
