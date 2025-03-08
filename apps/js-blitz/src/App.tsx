import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@repo/ui/components/resizable';
import { Editor } from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';
import { FileExplorer } from '@/components/FileExplorer';
import { Preview } from '@/components/Preview';
import { Tabs } from '@/components/Tabs';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@repo/ui/components/sonner';
import { Tutorials } from '@/pages/Tutorials';
import { Brand } from '@/pages/Brand';

function App() {
  const { files, folders, activeFileId, updateFile } = useEditorStore();
  const [showTutorials, setShowTutorials] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const activeFile = files.find((f) => f.id === activeFileId);
  const activeFolder = activeFile ? folders.find(f => f.id === activeFile.folderId) : null;

  const getFilePath = () => {
    if (!activeFile || !activeFolder) return '';
    return `${activeFolder.name}/${activeFile.name}`;
  };

  const handleLog = (log: string) => {
    setLogs(prev => [...prev, log]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const reloadPreview = () => {
    clearLogs();
  };

  if (showBrand) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-screen bg-background overflow-hidden flex flex-col">
          <Navbar 
            onTutorialClick={() => {
              setShowTutorials(true);
              setShowBrand(false);
            }}
            onBrandClick={() => setShowBrand(false)}
          />
          <Brand />
        </div>
      </ThemeProvider>
    );
  }

  if (showTutorials) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-screen bg-background overflow-hidden flex flex-col">
          <Navbar 
            onTutorialClick={() => setShowTutorials(false)}
            onBrandClick={() => {
              setShowTutorials(false);
              setShowBrand(true);
            }}
          />
          <Tutorials />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen bg-background overflow-hidden flex flex-col">
        <Navbar 
          onTutorialClick={() => setShowTutorials(true)}
          onBrandClick={() => setShowBrand(true)}
        />
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1"
          onLayout={(sizes) => {
            window.requestAnimationFrame(() => {
              document.body.style.setProperty('--explorer-width', `${sizes[0]}%`);
              document.body.style.setProperty('--editor-width', `${sizes[1]}%`);
              document.body.style.setProperty('--preview-width', `${sizes[2]}%`);
            });
          }}
        >
          <ResizablePanel 
            defaultSize={20} 
            minSize={15}
            className="overflow-hidden"
          >
            <FileExplorer />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={45}
            className="overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <Tabs />
              {activeFile && (
                <>
                  <div className="border-b px-3 py-1.5 text-sm text-muted-foreground">
                    {getFilePath()}
                  </div>
                  <Editor
                    height="calc(100% - 66px)"
                    language={activeFile.language}
                    value={activeFile.content}
                    onChange={(value) => {
                      if (value) {
                        updateFile(activeFile.id, value);
                      }
                    }}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                      },
                    }}
                    loading={<div className="p-4">Loading editor...</div>}
                  />
                </>
              )}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={35}
            className="overflow-hidden"
          >
            <Preview 
              logs={logs}
              onLog={handleLog}
              onClearLogs={clearLogs}
              onReload={reloadPreview}
              fileName={activeFile?.name}
              filePath={getFilePath()}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;