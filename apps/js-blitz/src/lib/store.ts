import { create } from 'zustand';
import { saveFoldersAndFiles, loadFoldersAndFiles } from './db';

export interface File {
  id: string;
  name: string;
  language: string;
  content: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
}

interface EditorState {
  files: File[];
  folders: Folder[];
  activeFileId: string | null;
  activeFolderId: string | null;
  openFiles: string[];
  setActiveFile: (id: string) => void;
  closeFile: (id: string) => void;
  closeAllFiles: () => void;
  updateFile: (id: string, content: string) => void;
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
  loadFromDB: () => Promise<void>;
  saveToDB: () => Promise<void>;
  openFolder: (folderId: string) => void;
}

export const getLanguageFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'html': return 'html';
    case 'css': return 'css';
    case 'js': return 'javascript';
    default: return 'plaintext';
  }
};

const defaultFiles = (folderId: string) => [
  {
    id: `${folderId}/index.html`,
    name: 'index.html',
    language: 'html',
    content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Hello World</h1>\n  <script src="script.js"></script>\n</body>\n</html>',
    folderId
  },
  {
    id: `${folderId}/styles.css`,
    name: 'styles.css',
    language: 'css',
    content: 'body {\n  font-family: sans-serif;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}',
    folderId
  },
  {
    id: `${folderId}/script.js`,
    name: 'script.js',
    language: 'javascript',
    content: 'console.log("Hello from JavaScript!");',
    folderId
  }
];

export const useEditorStore = create<EditorState>((set, get) => ({
  files: defaultFiles('default'),
  folders: [{ id: 'default', name: 'default' }],
  activeFileId: 'default/index.html',
  activeFolderId: 'default',
  openFiles: ['default/index.html', 'default/styles.css', 'default/script.js'],
  
  setActiveFile: (id) => {
    const file = get().files.find(f => f.id === id);
    if (!file) return;

    set(state => ({
      activeFileId: id,
      openFiles: state.openFiles.includes(id) ? state.openFiles : [...state.openFiles, id]
    }));
  },

  closeFile: (id) => {
    set(state => {
      const newOpenFiles = state.openFiles.filter(fileId => fileId !== id);
      return {
        openFiles: newOpenFiles,
        activeFileId: id === state.activeFileId 
          ? newOpenFiles[newOpenFiles.length - 1] || null 
          : state.activeFileId
      };
    });
  },

  closeAllFiles: () => {
    set({ openFiles: [], activeFileId: null });
  },

  updateFile: (id, content) => {
    set(state => ({
      files: state.files.map(file => 
        file.id === id ? { ...file, content } : file
      )
    }));
    get().saveToDB();
  },

  addFolder: (name) => {
    const { folders } = get();
    const normalizedName = name.toLowerCase().trim();
    
    // Check if folder name already exists
    if (folders.some(f => f.name.toLowerCase() === normalizedName)) {
      throw new Error('A folder with this name already exists');
    }

    const folderId = name;
    const newFiles = defaultFiles(folderId);
    
    set((state) => {
      const newState = {
        folders: [...state.folders, { id: folderId, name }],
        files: [...state.files, ...newFiles],
        activeFileId: `${folderId}/index.html`,
        activeFolderId: folderId,
        openFiles: newFiles.map(f => f.id)
      };
      get().saveToDB();
      return newState;
    });
  },

  deleteFolder: (id) =>
    set((state) => {
      const newState = {
        folders: state.folders.filter((f) => f.id !== id),
        files: state.files.filter((f) => f.folderId !== id),
        openFiles: state.openFiles.filter(fileId => !state.files.find(f => f.id === fileId)?.folderId?.includes(id)),
        activeFileId: state.activeFileId && state.files.find(f => f.id === state.activeFileId)?.folderId === id
          ? null
          : state.activeFileId,
        activeFolderId: state.activeFolderId === id ? null : state.activeFolderId
      };
      get().saveToDB();
      return newState;
    }),

  loadFromDB: async () => {
    try {
      const { folders, files } = await loadFoldersAndFiles();
      if (folders.length > 0 && files.length > 0) {
        const defaultFolderFiles = files.filter(f => f.folderId === folders[0].id);
        set({ 
          folders, 
          files, 
          activeFileId: defaultFolderFiles[0].id,
          activeFolderId: folders[0].id,
          openFiles: defaultFolderFiles.map(f => f.id)
        });
      }
    } catch (error) {
      console.error('Failed to load from DB:', error);
    }
  },

  saveToDB: async () => {
    try {
      await saveFoldersAndFiles(get().folders, get().files);
    } catch (error) {
      console.error('Failed to save to DB:', error);
    }
  },

  openFolder: (folderId: string) => {
    const folderFiles = get().files.filter(f => f.folderId === folderId);
    set({
      openFiles: folderFiles.map(f => f.id),
      activeFileId: folderFiles.find(f => f.name === 'index.html')?.id || folderFiles[0]?.id || null,
      activeFolderId: folderId
    });
  }
}));