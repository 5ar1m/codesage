import { ensureGitRepo } from '../utils/ensureGitRepo.js';
import { getEmbeddableFiles } from '../utils/embeddableFiles.js';
import { chunkFiles } from '../utils/chunk.js';
import { embedChunks } from '../utils/embed.js';
import { storeEmbeddings } from '../services/storeEmbeddings.js';
import { getLastCommitId } from '../utils/lastCommit.js';
import { addCodebaseToDB } from '../services/addCodebase.js';
import { getCodebase } from '../services/getCodebase.js';

export async function handleCodebase(projectPath) {
    
    const existing = await getCodebase(projectPath);
    if (typeof existing === 'object') return existing;

    await ensureGitRepo(projectPath);

    const embeddableFiles = await getEmbeddableFiles(projectPath);

    const allChunks = await chunkFiles(embeddableFiles, projectPath);

    const embeddingList = await embedChunks(allChunks);

    const collectionName = await storeEmbeddings(embeddingList, projectPath);

    const lastCommit = await getLastCommitId(projectPath);
    const codebaseInfo = await addCodebaseToDB(projectPath, collectionName, lastCommit);

    return codebaseInfo;
}