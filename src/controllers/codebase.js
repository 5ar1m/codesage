import fileDialog from 'node-file-dialog';
import { ensureGitRepo } from '../utils/ensureGitRepo.js';
import { getEmbeddableFiles } from '../utils/embeddableFiles.js';
import { chunkFiles } from '../utils/chunk.js';
import { embedChunks } from '../utils/embed.js';
import { storeEmbeddings } from '../services/storeEmbeddings.js';
import { getLastCommitId } from '../utils/lastCommit.js';
import { addCodebaseToDB } from '../services/addCodebase.js';

export async function addCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    const path = folder[0];
    //check if codebase already exist or not
    await ensureGitRepo(path);
    const embeddableFiles = await getEmbeddableFiles(path);
    const allChunks = await chunkFiles(embeddableFiles, path);
    const embeddingList = await embedChunks(allChunks);
    const collectionName = await storeEmbeddings(embeddingList, path);
    const lastCommit = await getLastCommitId(path);
    await addCodebaseToDB(path, collectionName, lastCommit);
}