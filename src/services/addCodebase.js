import { initDB } from "../config/lowdb.js";

export async function addCodebaseToDB(projectPath, collectionName, lastCommit) {
    const db = await initDB();

    await db.read();

    const codebaseInfo = { projectPath, collectionName, lastCommit };

    db.data.codebases.push(codebaseInfo);
    await db.write();
    
    return codebaseInfo;
}
