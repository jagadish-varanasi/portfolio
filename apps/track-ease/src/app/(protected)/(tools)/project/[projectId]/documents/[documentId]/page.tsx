import React from "react";
import Editor from "./components/editor";
import Toolbar from "./components/toolbar";
import Navbar from "./components/navbar";
import { Room } from "./components/room";
import prisma from "@/lib/db";

async function Page({
  params,
}: {
  params: { documentId: string; projectId: string };
}) {
  const documentData = await prisma.documents.findUnique({
    where: { id: params.documentId },
    select: { id: true, title: true },
  });

  if (!documentData) {
    throw new Error("Document not found");
  }

  console.log(documentData, "DOC DATA");

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-8 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={documentData} />
          <Toolbar />
        </div>
        <div className="pt-[140px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
}

export default Page;
