import { ensureGitRepo } from './ensureGitRepo.js';
import { getEmbeddableFiles } from './embeddableFiles.js';
import { chunkFiles } from './chunk.js';
import { embedChunks } from './embed.js';
import { storeEmbeddings } from '../services/storeEmbeddings.js';
import { getLastCommitId } from './lastCommit.js';
import { addCodebase } from '../services/addCodebase.js';
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
    const codebaseInfo = await addCodebase(projectPath, collectionName, lastCommit);

    return codebaseInfo;
}