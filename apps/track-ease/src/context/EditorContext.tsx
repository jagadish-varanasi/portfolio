"use client";
import React, { useEffect, useState } from "react";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
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
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import suggestion from "./suggestion";
import { WebrtcProvider } from "y-webrtc";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { addTable } from "./tableInsertion";
import { saveEpic, saveEpicDraft } from "@/app/actions";

const ydoc = new Y.Doc();
// const provider = new HocuspocusProvider({
//   url: "ws://127.0.0.1:1234",
//   name: "example-document",
// });
const provider = new WebrtcProvider("test", ydoc);

export const EditorContext = React.createContext<{
  boldClick: () => void;
  handleSave: () => Promise<void>;
  handleDraftSave: (id: string, draftTitle: string) => Promise<void>;
  editor: null | Editor;
  details: { hlMap: any; title: string; description: string };
  handleDetails: (key: string, value: string[] | string | {}) => void;
  setDetails: (data: any) => void;
  putDocument: (data: any) => void;
}>({
  boldClick: () => {},
  editor: null,
  handleSave: () => Promise.resolve(),
  handleDraftSave: (id: string, draftTitle: string) => Promise.resolve(),
  details: { hlMap: {}, title: "", description: "" },
  handleDetails: () => {},
  setDetails: (data) => {},
  putDocument: (data) => {},
});

function EditorContextProvider({
  children,
  releaseId,
  projectId,
}: Readonly<{
  children: React.ReactNode;
  releaseId: string;
  projectId: string;
  ydoc: Y.Doc;
}>) {
  // A new Y document
  const [details, setDetails] = useState<{
    hlMap: Record<string, any>;
    title: string;
    description: string;
    id?: string;
  }>({ hlMap: {}, title: "", description: "", id: "" });

  const editor = useEditor({
    extensions: [
      // Collaboration.configure({
      //   document: provider,
      // }),
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
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
      CodeBlock,
      Blockquote,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ListItem,
      OrderedList,
      BulletList,
      // CollaborationCursor.configure({
      //   provider: provider,
      //   user: {
      //     name: "Cyndi Lauper",
      //     color: "#f783ac",
      //   },
      // }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-md xl:prose-md focus:outline-none",
      },
    },
  });

  useEffect(() => {
    console.log("room");
  }, []);

  const handleBoldClick = () => {
    console.log("bold");
  };

  const handleSave = async () => {
    const hlr = Object.values(details?.hlMap);
    const doc = JSON.stringify(editor?.getJSON());
    const data = {
      title: details.title,
      description: details.description,
      highLevelRequirements: hlr,
      document: doc,
      projectId,
      id: details?.id,
    };
    console.log(editor?.getJSON());
    return await saveEpic(data);
  };

  const handleDraftSave = async (id: string, draftTitle: string) => {
    console.log(id, "initiationId");
    const hlr = Object.values(details?.hlMap);
    const doc = JSON.stringify(editor?.getJSON());
    console.log(details?.hlMap);
    const data = {
      title: draftTitle,
      description: details.description,
      highLevelRequirements: hlr,
      document: doc,
      projectId,
      id: details.id,
      ...(id && { initiationId: id?.[0] }),
    };
    console.log(data, "aaa");
    return await saveEpicDraft(data);
  };

  const handleDetails = (key: string, value: string[] | string | {}) => {
    console.log(key, value);
    const data = { ...details, [key]: value };
    setDetails(data);
    editor?.commands.setContent(addTable(data as any));
  };

  const putDocument = (data: any) => {
    editor?.commands.setContent(data);
  };

  console.log(details, "d");

  return (
    <EditorContext.Provider
      value={{
        boldClick: handleBoldClick,
        editor,
        handleSave,
        handleDraftSave,
        details,
        handleDetails,
        setDetails,
        putDocument,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;
