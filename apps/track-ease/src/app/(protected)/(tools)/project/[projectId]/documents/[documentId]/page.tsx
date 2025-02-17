import React from "react";
import Editor from "./components/editor";
import Toolbar from "./components/toolbar";
import Navbar from "./components/navbar";
import { Room } from "./components/room";

function Page({
  params,
}: {
  params: { documentId: string; projectId: string };
}) {
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar />
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
