import { useEditorStore } from '@/lib/store';
import { Button } from '@repo/ui/components/button';
import { X } from 'lucide-react';

export function Tabs() {
  const { files, openFiles, activeFileId, setActiveFile, closeFile, closeAllFiles } = useEditorStore();

  return (
    <div className="flex border-b bg-muted">
      <div className="flex-1 flex overflow-x-auto">
        {openFiles.map((fileId) => {
          const file = files.find(f => f.id === fileId);
          if (!file) return null;
          
          return (
            <div
              key={file.id}
              className={`
                flex items-center gap-2 px-3 py-1.5 border-r min-w-[100px]
                ${activeFileId === file.id ? 'bg-background' : 'hover:bg-background/50'}
              `}
            >
              <Button
                variant="ghost"
                className="h-5 px-0"
                onClick={() => setActiveFile(file.id)}
              >
                {file.name}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                onClick={() => closeFile(file.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </div>
      {openFiles.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 hover:bg-muted-foreground/20"
          onClick={closeAllFiles}
        >
          Close All
        </Button>
      )}
    </div>
  );
}