import { db } from "../app.js";

export async function getCodebase(projectPath) {
    await db.read();
    const entry = db.data.codebases.find(p => p.projectPath === projectPath);
    return entry;
}