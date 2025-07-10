import { db } from '../app.js';

export async function updateLastCommit(projectPath, newCommitId) {
    await db.read();

    const entry = db.data.codebases.find(p => p.projectPath === projectPath);
    if (entry) {
        entry.lastCommit = newCommitId;
        await db.write();
        return ;
    }
}