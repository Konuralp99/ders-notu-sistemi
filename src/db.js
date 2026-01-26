import Dexie from 'dexie';

export const db = new Dexie('DersNotuNotebookDB');

db.version(1).stores({
    drawings: '++id, title, createdAt' // 'data' is stored but not indexed
});
