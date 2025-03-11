import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/resizable";
import { Button } from "@repo/ui/components/button";
import {
  Trash2,
  ChevronRight,
  ChevronDown,
  SendHorizontal,
} from "lucide-react";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store";

interface PreviewProps {
  logs?: string[];
  onLog?: (log: string) => void;
  onClearLogs?: () => void;
  onReload?: () => void;
  fileName?: string;
  filePath?: string;
  content?: string;
  isTutorial?: boolean;
}

interface ConsoleLogProps {
  log: {
    type: string;
    content: any[];
    timestamp: number;
    stack?: string;
    lineNumber?: number;
    groupId?: string;
    expanded?: boolean;
  };
}

const ConsoleLog = ({ log }: ConsoleLogProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLogStyle = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-500 bg-red-500/10";
      case "warn":
        return "text-yellow-500 bg-yellow-500/10";
      case "info":
        return "text-blue-500 bg-blue-500/10";
      case "debug":
        return "text-purple-500 bg-purple-500/10";
      case "input":
        return "text-green-500 bg-green-500/10";
      default:
        return "text-foreground";
    }
  };

  const formatValue = (value: any): JSX.Element => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (value === undefined)
      return <span className="text-gray-500">undefined</span>;
    if (typeof value === "string")
      return <span className="text-green-500">"{value}"</span>;
    if (typeof value === "number")
      return <span className="text-blue-500">{value}</span>;
    if (typeof value === "boolean")
      return <span className="text-purple-500">{String(value)}</span>;
    if (Array.isArray(value)) {
      return (
        <div className="pl-4">
          <span className="text-gray-500">[</span>
          <div className="pl-4">
            {value.map((item, i) => (
              <div key={i}>
                {formatValue(item)}
                {i < value.length - 1 && (
                  <span className="text-gray-500">,</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-gray-500">]</span>
        </div>
      );
    }
    if (typeof value === "object") {
      if (
        value instanceof Error ||
        (value.name && value.message && value.stack)
      ) {
        return (
          <div className="text-red-500">
            <div>
              {value.name}: {value.message}
            </div>
            {isExpanded && value.stack && (
              <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
                {value.stack}
              </pre>
            )}
          </div>
        );
      }
      return (
        <div className="pl-4">
          <span className="text-gray-500">{"{"}</span>
          <div className="pl-4">
            {Object.entries(value).map(([key, val], i, arr) => (
              <div key={key}>
                <span className="text-purple-500">{key}</span>
                <span className="text-gray-500">: </span>
                {formatValue(val)}
                {i < arr.length - 1 && <span className="text-gray-500">,</span>}
              </div>
            ))}
          </div>
          <span className="text-gray-500">{"}"}</span>
        </div>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div
      className={`py-1 px-2 font-mono text-sm border-b border-border ${getLogStyle(log.type)}`}
    >
      <div className="flex items-start gap-2">
        {log.lineNumber && (
          <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[4rem]">
            Line {log.lineNumber}
          </span>
        )}
        {(log.content.some((item) => typeof item === "object") ||
          log.stack) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 p-0.5 hover:bg-muted rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        )}
        <div className="flex-1">
          {log.type === "input" ? (
            <span className="text-green-500">
              {">"} {log.content[0]}
            </span>
          ) : (
            log.content.map((item, i) => (
              <span key={i}>
                {isExpanded ? formatValue(item) : JSON.stringify(item, null, 2)}
                {i < log.content.length - 1 && " "}
              </span>
            ))
          )}
          {log.stack && isExpanded && (
            <div className="mt-2 text-xs text-gray-500 whitespace-pre-wrap">
              {log.stack}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(log.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

const CONSOLE_HEIGHT_KEY = "jsblitz-console-height";

export interface ChildRef {
  childRunMethod: () => void;
}

export const Preview = forwardRef<ChildRef, PreviewProps>(
  (
    {
      logs = [],
      onLog = () => {},
      onClearLogs = () => {},
      fileName = "",
      filePath = "",
      content = "",
      isTutorial = false,
    },
    ref
  ) => {
    const { files } = useEditorStore();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const consoleEndRef = useRef<HTMLDivElement>(null);
    const [key, setKey] = useState(0);
    const [consoleInput, setConsoleInput] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [editableContent, setEditableContent] = useState(content);
    const [consoleHeight, setConsoleHeight] = useState(() => {
      const saved = localStorage.getItem(CONSOLE_HEIGHT_KEY);
      return saved ? parseInt(saved, 10) : 30;
    });
    const getPreviewContentRef = useRef(getPreviewContent);
    const [data, setData] = useState({ html: "", css: "", js: "" });

    const { html, css, js } = data;

    useEffect(() => {
      setEditableContent(content);
    }, [content]);

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === "console") {
          onLog(JSON.stringify(event.data.log));
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [onLog]);

    useEffect(() => {
      if (consoleEndRef.current) {
        consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [logs]);

    function getPreviewContent() {
      if (isTutorial) {
        if (fileName?.endsWith(".js")) {
          return {
            html: '<div style="padding: 20px; text-align: center;"><h2 style="color: #666;">Open the console to see the output</h2><p style="color: #888;">Click the "Run" button or press Ctrl+S to execute the code</p></div>',
            css: "",
            js: editableContent || content,
          };
        }
        if (fileName?.endsWith(".html")) {
          return {
            html: editableContent || content,
            css: "",
            js: "",
          };
        }
        return { html: "", css: "", js: editableContent || content };
      }

      if (!fileName || !filePath) return { html: "", css: "", js: "" };

      const fileId = filePath;
      const currentFile = files.find((f) => f.id === fileId);

      if (!currentFile) return { html: "", css: "", js: "" };

      const folderFiles = files.filter(
        (f) => f.folderId === currentFile.folderId
      );

      return {
        html: folderFiles.find((f) => f.name === "index.html")?.content || "",
        css: folderFiles.find((f) => f.name === "styles.css")?.content || "",
        js: folderFiles.find((f) => f.name === "script.js")?.content || "",
      };
    }

    useEffect(() => {
      getPreviewContentRef.current = getPreviewContent;
    }, [getPreviewContent]);

    const handleRun = () => {
      setIsRefreshing(true);
      setKey((prev) => prev + 1);
      const data = getPreviewContentRef.current();
      setData(data);
      setTimeout(() => setIsRefreshing(false), 750);
    };

    useImperativeHandle(ref, () => ({
      childRunMethod() {
        handleRun();
      },
    }));

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          handleRun();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const executeCode = (code: string) => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        onLog(
          JSON.stringify({
            type: "input",
            content: [code],
            timestamp: Date.now(),
          })
        );

        try {
          setConsoleHistory((prev) => [...prev, code]);
          setHistoryIndex(-1);

          iframe.contentWindow.postMessage(
            {
              type: "execute",
              code,
            },
            "*"
          );
        } catch (error) {
          console.error("Execution error:", error);
        }

        setConsoleInput("");
        if (inputRef.current) {
          inputRef.current.style.height = "auto";
        }
      }
    };

    const handleConsoleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (consoleInput.trim()) {
        executeCode(consoleInput.trim());
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleConsoleSubmit(e);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < consoleHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setConsoleInput(consoleHistory[consoleHistory.length - 1 - newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setConsoleInput(consoleHistory[consoleHistory.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setConsoleInput("");
        }
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setConsoleInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const wrappedContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${css}
          /* Default styles */
          body { font-family: system-ui, sans-serif; margin: 0; }
          .tutorial-message { 
            padding: 20px;
            text-align: center;
            color: #666;
          }
          .tutorial-message p {
            color: #888;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        ${html}
        <script>
          (function() {
            let groupId = null;
            let timeEntries = {};
    
            const getErrorLineNumber = (error) => {
              if (!error || !error.stack) return undefined;
              
              // First try to get line number from stack trace
              const stackMatch = error.stack.match(/at eval.*<anonymous>:(\d+):/);
              if (stackMatch) return parseInt(stackMatch[1], 10);
              
              // If that fails, try to get it from the error message
              const msgMatch = error.message.match(/at line (\d+)/i);
              if (msgMatch) return parseInt(msgMatch[1], 10);
              
              return undefined;
            };
    
            const formatError = (error) => ({
              name: error.name,
              message: error.message,
              stack: error.stack,
              lineNumber: getErrorLineNumber(error)
            });
    
            const sendToParent = (type, args, error) => {
              const lineNumber = error ? getErrorLineNumber(error) : undefined;
              window.parent.postMessage({
                type: 'console',
                log: {
                  type,
                  content: args,
                  timestamp: Date.now(),
                  stack: error?.stack,
                  lineNumber,
                  groupId
                }
              }, '*');
            };
    
            const console = {
              log: (...args) => sendToParent('log', args),
              error: (...args) => {
                const error = args[0] instanceof Error ? args[0] : new Error(args.join(' '));
                sendToParent('error', [formatError(error)], error);
              },
              warn: (...args) => sendToParent('warn', args),
              info: (...args) => sendToParent('info', args),
              debug: (...args) => sendToParent('debug', args),
              clear: () => sendToParent('clear', []),
              group: (label) => {
                groupId = Math.random().toString(36).slice(2);
                sendToParent('group', [label]);
              },
              groupEnd: () => {
                groupId = null;
                sendToParent('groupEnd', []);
              },
              time: (label) => {
                timeEntries[label] = performance.now();
              },
              timeEnd: (label) => {
                if (timeEntries[label]) {
                  const duration = performance.now() - timeEntries[label];
                  sendToParent('time', [\`\${label}: \${duration.toFixed(2)}ms\`]);
                  delete timeEntries[label];
                }
              }
            };
    
            window.onerror = (message, source, lineno, colno, error) => {
              console.error(error || new Error(message));
              return true;
            };
    
            window.addEventListener('unhandledrejection', (event) => {
              console.error('Unhandled Promise Rejection:', event.reason);
              event.preventDefault();
            });
    
            window.addEventListener('message', (event) => {
              if (event.data?.type === 'execute') {
                try {
                  const result = eval(event.data.code);
                  if (result !== undefined) {
                    console.log(result);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            });
    
            Object.assign(window, { console });
          })();
        </script>
        <script>${js}</script>
      </body>
    </html>`.trim();

    const parsedLogs = logs.map((log) => JSON.parse(log));

    const handlePanelResize = (sizes: number[]) => {
      const newConsoleHeight = sizes[1];
      setConsoleHeight(newConsoleHeight);
      localStorage.setItem(CONSOLE_HEIGHT_KEY, String(newConsoleHeight));
    };

    return (
      <div className="h-full flex flex-col">
        <div className="border-b px-2 flex items-center justify-between h-9">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Result</span>
            {filePath && (
              <span className="text-sm text-muted-foreground">{filePath}</span>
            )}
          </div>
        </div>

        <ResizablePanelGroup
          direction="vertical"
          className="flex-1"
          onLayout={handlePanelResize}
        >
          <ResizablePanel defaultSize={100 - consoleHeight}>
            <iframe
              key={key}
              ref={iframeRef}
              srcDoc={wrappedContent}
              className="w-full h-full"
              sandbox="allow-scripts allow-modals allow-same-origin"
              title="preview"
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={consoleHeight} className="bg-muted">
            <div className="h-full flex flex-col">
              <div className="border-b bg-muted px-2 py-1 flex items-center justify-between">
                <span className="text-sm font-medium">Console</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClearLogs}
                  title="Clear console"
                  className="h-6 w-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="font-mono text-sm">
                  {parsedLogs.map((log, i) => (
                    <ConsoleLog key={i} log={log} />
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              </ScrollArea>

              <form
                onSubmit={handleConsoleSubmit}
                className="border-t p-2 flex gap-2 items-start"
              >
                <textarea
                  ref={inputRef}
                  value={consoleInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter JavaScript code..."
                  className="flex-1 bg-background rounded p-2 min-h-[36px] max-h-[200px] resize-none font-mono text-sm"
                  rows={1}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="mt-1"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }
);
