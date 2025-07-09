import fileDialog from 'node-file-dialog';
import { ensureGitRepo } from '../utils/ensureGitRepo.js';
import { getEmbeddableFiles } from '../utils/embeddableFiles.js';
import { chunkFiles } from '../utils/chunk.js';
import { embedChunks } from '../utils/embed.js';
import { storeEmbeddings } from '../services/storeEmbeddings.js';
import { getLastCommitId } from '../utils/lastCommit.js';
import { addCodebaseToDB } from '../services/addCodebase.js';
import { getCodebase } from '../services/getCodebase.js';

export async function addCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    const path = folder[0];

    const existing = await getCodebase(path);
    if (typeof existing === 'string') return existing;

    await ensureGitRepo(path);

    const embeddableFiles = await getEmbeddableFiles(path);

    const allChunks = await chunkFiles(embeddableFiles, path);

    const embeddingList = await embedChunks(allChunks);

    const collectionName = await storeEmbeddings(embeddingList, path);

    const lastCommit = await getLastCommitId(path);
    const codebaseInfo = await addCodebaseToDB(path, collectionName, lastCommit);

    return codebaseInfo;
}