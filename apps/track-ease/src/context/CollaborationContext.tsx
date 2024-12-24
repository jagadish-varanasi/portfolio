"use client";
import React, { useState } from "react";
import EditorContextProvider from "./EditorContext";
import * as Y from "yjs";

export const CollaborationContext = React.createContext<{}>({});

function CollaborationContextProvider({
  children,
  releaseId,
  projectId,
  release,
}: Readonly<{
  children: React.ReactNode;
  releaseId: string;
  projectId: string;
  release: any;
}>) {
  const ydoc = new Y.Doc();
  return (
    <CollaborationContext.Provider value={{}}>
      <EditorContextProvider
        releaseId={releaseId}
        projectId={projectId}
        ydoc={ydoc}
      >
        {children}
      </EditorContextProvider>
    </CollaborationContext.Provider>
  );
}

export default CollaborationContextProvider;
