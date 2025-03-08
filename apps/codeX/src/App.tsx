import { useState } from 'react';
import { Code2Icon, FileIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Editor from '@monaco-editor/react';
import { Button } from '@repo/ui/components/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@repo/ui/components/resizable';
import { FileExplorer, defaultFiles, type File } from '@/lib/file-explorer';
import { Preview } from '@/lib/preview';

function App() {
  const [files] = useState<File[]>(defaultFiles);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen bg-background">
      {/* Header */}
      <div className="h-12 border-b flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-2">
          <Code2Icon className="h-6 w-6 text-blue-500" />
          <span className="font-semibold text-lg">CodeCraft IDE</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10}>
          <div className="h-[calc(100vh-48px)] border-r bg-card">
            <div className="p-4 text-sm font-medium text-muted-foreground uppercase">Explorer</div>
            <FileExplorer
              items={files}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Editor Area */}
        <ResizablePanel defaultSize={85}>
          {selectedFile ? (
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <div className="h-full">
                  <div className="border-b px-4 py-2 bg-card">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                  </div>
                  <Editor
                    height="calc(100% - 41px)"
                    defaultLanguage={selectedFile.name.endsWith('.js') ? 'javascript' : 'css'}
                    value={selectedFile.content}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                      readOnly: true,
                      lineNumbers: 'on',
                      renderLineHighlight: 'all',
                      scrollBeyondLastLine: false
                    }}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={50}>
                <Preview files={files} selectedFile={selectedFile} />
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a file to view code
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;