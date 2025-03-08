import { useRef, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CodeEditor = ({ value, onChange, className }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full min-h-[400px] p-4 font-mono text-sm bg-muted rounded-md resize-none',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      spellCheck="false"
    />
  );
};

export default CodeEditor;