import { db } from "../app.js";

export async function addCodebaseToDB(projectPath, collectionName, lastCommit) {
    await db.read();

    const codebaseInfo = { projectPath, collectionName, lastCommit };

    db.data.codebases.push(codebaseInfo);
    await db.write();
    
    return codebaseInfo;
}
