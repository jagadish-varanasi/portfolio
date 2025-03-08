export interface FileType {
  id: string;
  name: string;
  content: string;
}

export interface FolderType {
  id: string;
  name: string;
  files: FileType[];
}