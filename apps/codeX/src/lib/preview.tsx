import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import type { File } from './file-explorer';

interface PreviewProps {
  files: File[];
  selectedFile: File | null;
}

export function Preview({ files, selectedFile }: PreviewProps) {
  const [key, setKey] = useState(0);
  const { theme } = useTheme();

  const getFileContent = (fileName: string) => {
    if (!selectedFile) return '';

    // Find the parent folder that contains the selected file
    let parentFolder: File | undefined;
    for (const topFolder of files) {
      for (const folder of topFolder.children || []) {
        if (folder.children?.some(file => file === selectedFile)) {
          parentFolder = folder;
          break;
        }
      }
    }

    if (!parentFolder) return '';

    // Get the content of the requested file from the same folder
    const content = parentFolder.children?.find(f => f.name === fileName)?.content || '';
    
    if (fileName === 'index.jsx' || fileName === 'index.js') {
      return content
        .replace(/import.*?;(\n|$)/g, '')
        .replace(/export default .*?;?$/m, '')
        .replace(/export { .* };?$/m, '')
        .trim();
    }
    return content;
  };

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [selectedFile]);

  if (!selectedFile) {
    return (
      <div className="h-full">
        <div className="border-b px-4 py-2 bg-card">
          <span className="text-sm font-medium">Preview</span>
        </div>
        <div className="h-[calc(100%-41px)] flex items-center justify-center text-muted-foreground">
          Select a file to view preview
        </div>
      </div>
    );
  }

  // Find the parent folder name and top-level folder
  let parentFolderName = '';
  let topFolderName = '';
  for (const topFolder of files) {
    for (const folder of topFolder.children || []) {
      if (folder.children?.some(file => file === selectedFile)) {
        parentFolderName = folder.name;
        topFolderName = topFolder.name;
        break;
      }
    }
  }

  // Determine if we're using React or vanilla JS based on the folder structure
  const isVanillaJS = topFolderName === 'Vanilla JavaScript';

  // Get the component name based on the folder
  const getComponentName = () => {
    switch (parentFolderName) {
      case 'Todo App':
        return 'TodoApp';
      case 'Debounce & Throttle':
        return 'App';
      case 'Tic Tac Toe':
        return 'App';
      default:
        return 'App';
    }
  };

  const previewContent = `
<!DOCTYPE html>
<html class="${theme}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root {
        color-scheme: ${theme};
      }
      body {
        margin: 0;
        background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        color: ${theme === 'dark' ? '#ffffff' : '#000000'};
      }
      ${getFileContent('styles.css')}
    </style>
    ${!isVanillaJS ? `
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    ` : ''}
  </head>
  <body>
    <div id="root"></div>
    ${isVanillaJS ? `
    <script>
      ${getFileContent('index.js')}
    </script>
    ` : `
    <script type="text/babel">
      const { useState, useCallback, useEffect } = React;
      
      ${getFileContent('index.jsx')}
      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(${getComponentName()}));
    </script>
    `}
  </body>
</html>`;

  return (
    <div className="h-full">
      <div className="border-b px-4 py-2 bg-card">
        <span className="text-sm font-medium">Preview</span>
      </div>
      <iframe
        key={key}
        title="preview"
        className="w-full h-[calc(100%-41px)] border-0 bg-background"
        srcDoc={previewContent}
        sandbox="allow-scripts allow-forms allow-modals allow-same-origin"
      />
    </div>
  );
}