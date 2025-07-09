import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

export async function initDB() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const dbFile = path.join(__dirname, '../../db.json');
    const adapter = new JSONFile(dbFile);

    const db = new Low(adapter, { codebases: [] });

    await db.read();
    await db.write();

    return db;
}