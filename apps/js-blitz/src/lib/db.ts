import { File, Folder } from './store';

export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('CodeEditorDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('folders')) {
        db.createObjectStore('folders', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };
  });
}

export async function saveFoldersAndFiles(folders: Folder[], files: File[]) {
  const db = await openDB();
  const tx = db.transaction(['folders', 'files'], 'readwrite');
  
  // Clear existing data
  await Promise.all([
    tx.objectStore('folders').clear(),
    tx.objectStore('files').clear()
  ]);

  // Save new data
  folders.forEach(folder => tx.objectStore('folders').add(folder));
  files.forEach(file => tx.objectStore('files').add(file));

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(undefined);
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadFoldersAndFiles(): Promise<{ folders: Folder[], files: File[] }> {
  const db = await openDB();
  const tx = db.transaction(['folders', 'files'], 'readonly');

  const folders = await new Promise<Folder[]>((resolve, reject) => {
    const request = tx.objectStore('folders').getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const files = await new Promise<File[]>((resolve, reject) => {
    const request = tx.objectStore('files').getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return { folders, files };
}