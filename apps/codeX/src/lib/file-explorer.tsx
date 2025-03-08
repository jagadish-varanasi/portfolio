import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { todoExample } from "./examples/todo-app";
import { debounceThrottleExample } from "./examples/debounce-throttle";
import { tictactoeExample } from "./examples/tictactoe";
import { vanillaCounterExample } from "./examples/vanilla-counter";

export interface File {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: File[];
  isOpen?: boolean;
}

export const defaultFiles: File[] = [
  {
    name: "Machine Coding Problems",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "Todo App",
        type: "folder",
        isOpen: true,
        children: [
          {
            name: "index.jsx",
            type: "file",
            content: todoExample.js,
          },
          {
            name: "styles.css",
            type: "file",
            content: todoExample.css,
          },
        ],
      },
      {
        name: "Debounce & Throttle",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "index.jsx",
            type: "file",
            content: debounceThrottleExample.js,
          },
          {
            name: "styles.css",
            type: "file",
            content: debounceThrottleExample.css,
          },
        ],
      },
      {
        name: "Tic Tac Toe",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "index.jsx",
            type: "file",
            content: tictactoeExample.js,
          },
          {
            name: "styles.css",
            type: "file",
            content: tictactoeExample.css,
          },
        ],
      },
    ],
  },
  {
    name: "Vanilla JavaScript",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "Counter",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "index.js",
            type: "file",
            content: vanillaCounterExample.js,
          },
          {
            name: "styles.css",
            type: "file",
            content: vanillaCounterExample.css,
          },
        ],
      },
    ],
  },
];

const FileIcon = ({ fileName }: { fileName: string }) => {
  const getIconClass = () => {
    if (fileName.endsWith(".jsx")) {
      return "icon icon-react";
    }
    if (fileName.endsWith(".js")) {
      return "icon icon-javascript";
    }
    if (fileName.endsWith(".css")) {
      return "icon icon-css";
    }
    return "icon icon-file";
  };

  return <div className={getIconClass()} />;
};

const FolderIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`icon ${isOpen ? "icon-folder-open" : "icon-folder"}`} />
  );
};

interface FileExplorerProps {
  items: File[];
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  path?: number[];
}

export function FileExplorer({
  items,
  selectedFile,
  onFileSelect,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(items.filter((item) => item.isOpen).map((item) => item.name))
  );

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderName)) {
        next.delete(folderName);
      } else {
        next.add(folderName);
      }
      return next;
    });
  };

  const handleFileClick = (file: File) => {
    if (file.type === "file") {
      onFileSelect(file);
    }
  };

  const renderItems = (items: File[], level: number = 0) => {
    return items.map((item, index) => (
      <div key={`${level}-${index}-${item.name}`}>
        <div
          className={`flex items-center gap-2 hover:bg-accent/50 rounded px-2 py-1 cursor-pointer transition-colors ${
            selectedFile?.name === item.name
              ? "bg-accent text-accent-foreground"
              : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() =>
            item.type === "folder"
              ? toggleFolder(item.name)
              : handleFileClick(item)
          }
        >
          <div className="flex items-center gap-1">
            {item.type === "folder" && (
              <ChevronRightIcon
                className={`h-3 w-3 transition-transform ${expandedFolders.has(item.name) ? "rotate-90" : ""}`}
              />
            )}
            {item.type === "folder" ? (
              <FolderIcon isOpen={expandedFolders.has(item.name)} />
            ) : (
              <FileIcon fileName={item.name} />
            )}
          </div>
          <span className="text-sm select-none">{item.name}</span>
        </div>
        {item.type === "folder" &&
          expandedFolders.has(item.name) &&
          item.children && <div>{renderItems(item.children, level + 1)}</div>}
      </div>
    ));
  };

  return (
    <ScrollArea className="h-[calc(100%-60px)]">
      {renderItems(items)}
    </ScrollArea>
  );
}
