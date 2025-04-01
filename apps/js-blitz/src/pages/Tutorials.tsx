import { useState, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/resizable";
import { Editor } from "@monaco-editor/react";
import { ChildRef, Preview } from "@/components/Preview";
import { tutorialFolders } from "@/lib/tutorials";
import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { ChevronDown, ChevronRight, RefreshCw } from "lucide-react";
import { FileType } from "@/lib/types";

export function Tutorials() {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const myRef = useRef<ChildRef>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((f) => f !== folderId)
        : [...prev, folderId]
    );
  };

  const handleFileSelect = (file: FileType) => {
    setSelectedFile(file);
    setEditableContent(file.content);
    setLogs([]);
  };

  const handleLog = (log: string) => {
    setLogs((prev) => [...prev, log]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const reloadPreview = () => {
    setIsRefreshing(true);
    myRef.current?.childRunMethod();
    clearLogs();
    setTimeout(() => setIsRefreshing(false), 750);
  };

  const getFileIcon = (fileName: string) => {
    const iconClass = "mr-2 inline-block w-5 h-5 align-middle";
    if (fileName.endsWith(".html")) {
      return (
        <span className={iconClass} style={{ color: "#e44d26" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30L5.902 27.201z"
            />
            <path
              fill="currentColor"
              d="m16 27.858l8.17-2.265l1.922-21.532H16v23.797z"
            />
            <path
              fill="#fff"
              d="M16 13.407h-4.09l-.282-3.165H16V7.151H8.25l.074.83l.759 8.517H16v-3.091z m0 8.027l-.014.004l-3.442-.929l-.22-2.465H9.221l.433 4.852l6.332 1.758l.014-.004v-3.216z"
            />
            <path
              fill="#fff"
              d="M15.989 13.407v3.091h3.806l-.358 4.009l-3.448.93v3.216l6.337-1.757l.046-.522l.726-8.137l.076-.83h-7.185z m0-6.256v3.091h7.466l.062-.694l.141-1.567l.074-.83h-7.743z"
            />
          </svg>
        </span>
      );
    }
    if (fileName.endsWith(".js")) {
      return (
        <span className={iconClass} style={{ color: "#f7df1e" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M2 2v28h28V2H2zm15.238 22.196c0 3.176-1.863 4.628-4.575 4.628-2.452 0-3.87-1.27-4.596-2.803l2.494-1.507c.48.853.917 1.575 1.97 1.575c1.004 0 1.644-.393 1.644-1.926v-10.41h3.063v10.443zm7.245 4.628c-2.844 0-4.685-1.355-5.581-3.13l2.494-1.442c.655 1.07 1.51 1.863 3.02 1.863c1.267 0 2.08-.634 2.08-1.513c0-1.048-.83-1.419-2.23-2.036l-.766-.328c-2.21-.94-3.676-2.123-3.676-4.62c0-2.297 1.751-4.041 4.488-4.041c1.95 0 3.348.678 4.356 2.45l-2.385 1.53c-.524-.94-1.092-1.31-1.97-1.31c-.896 0-1.466.568-1.466 1.31c0 .917.57 1.288 1.887 1.86l.766.328c2.603 1.114 4.069 2.25 4.069 4.803c0 2.757-2.166 4.276-5.086 4.276z"
            />
          </svg>
        </span>
      );
    }
    if (fileName.endsWith(".css")) {
      return (
        <span className={iconClass} style={{ color: "#42a5f5" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M5.902 27.201L3.656 2h24.688l-2.249 25.197L15.985 30L5.902 27.201z"
            />
            <path
              fill="currentColor"
              d="m16 27.858l8.17-2.265l1.922-21.532H16v23.797z"
            />
            <path
              fill="#fff"
              d="M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.829l-.759 8.518H16v-3.091z"
            />
            <path
              fill="#fff"
              d="m16.019 21.218l-.014.004l-3.442-.93l-.22-2.465H9.24l.433 4.853l6.331 1.758l.015-.004v-3.216z"
            />
            <path
              fill="#fff"
              d="m19.827 16.151l-.372 4.139l-3.447.93v3.216l6.336-1.756l.047-.522l.537-6.007h-3.101z"
            />
            <path
              fill="#fff"
              d="M16.011 6.935v3.091h-7.466l-.062-.695l-.141-1.567l-.074-.829h7.743z"
            />
          </svg>
        </span>
      );
    }
    return (
      <span className={iconClass} style={{ color: "#8bc34a" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M20.938 3H8.062C7.477 3 7 3.477 7 4.062v23.875C7 28.523 7.477 29 8.062 29h15.876c.585 0 1.062-.477 1.062-1.062V9Zm-4.938.5v5h5l-5-5Z"
          />
        </svg>
      </span>
    );
  };

  // Auto-expand first folder and select first file on mount
  useEffect(() => {
    if (tutorialFolders.length > 0) {
      const firstFolder = tutorialFolders[0];
      setExpandedFolders([firstFolder.id]);
      if (firstFolder.files.length > 0) {
        const firstFile = firstFolder.files[0];
        setSelectedFile(firstFile);
        setEditableContent(firstFile.content);
      }
    }
  }, []);

  return (
    <div className="h-screen bg-background overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-full flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {tutorialFolders.map((folder) => (
                  <div key={folder.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 mb-1"
                      onClick={() => toggleFolder(folder.id)}
                    >
                      {expandedFolders.includes(folder.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span
                        className="w-5 h-5 inline-block"
                        style={{ color: "#42a5f5" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M27.5 5.5h-14l-1-1h-9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h24c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z"
                          />
                          <path
                            fill="currentColor"
                            d="M27.5 10.5h-23c-.55 0-1 .45-1 1L2.04 23c0 .55.45 1 1 1h23c.55 0 1-.45 1-1l1.46-11.5c0-.55-.45-1-1-1z"
                          />
                        </svg>
                      </span>
                      {folder.name}
                    </Button>

                    {expandedFolders.includes(folder.id) && (
                      <div className="ml-6 space-y-1">
                        {folder.files.map((file) => (
                          <Button
                            key={file.id}
                            variant={
                              selectedFile?.id === file.id
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start gap-2"
                            onClick={() => handleFileSelect(file)}
                          >
                            {getFileIcon(file.name)}
                            {file.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4 bg-muted/50">
              <h2 className="font-semibold">JavaScript Tutorials</h2>
              <p className="text-sm text-muted-foreground">
                Learn JavaScript with interactive examples
              </p>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={45}>
          {selectedFile ? (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center border-b pl-3 text-sm text-muted-foreground">
                <span>{selectedFile.id}</span>
                <Button
                  variant="default"
                  size="sm"
                  onClick={reloadPreview}
                  title="Run (Ctrl+S)"
                  className="bg-green-500 hover:bg-green-600 text-white gap-2 m-1 shadow-sm"
                >
                  <RefreshCw
                    className={
                      isRefreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"
                    }
                  />
                  Run
                </Button>
              </div>
              <Editor
                height="calc(100% - 33px)"
                language={
                  selectedFile.name.endsWith(".js") ? "javascript" : "html"
                }
                value={editableContent}
                onChange={(value) => {
                  if (value) {
                    setEditableContent(value);
                  }
                }}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a file to view its content
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={35}>
          {selectedFile && (
            <Preview
              logs={logs}
              onLog={handleLog}
              onClearLogs={clearLogs}
              onReload={reloadPreview}
              fileName={selectedFile.name}
              filePath={selectedFile.id}
              content={editableContent}
              isTutorial={true}
              ref={myRef}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
