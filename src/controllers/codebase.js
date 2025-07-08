import fileDialog from 'node-file-dialog';
import { ensureGitRepo } from '../utils/ensureGitRepo.js';
import { getEmbeddableFiles } from '../utils/getEmbeddableFiles.js';
import { chunkFiles } from '../utils/chunk.js';
import { embedChunks } from '../utils/embed.js';

export async function addCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    const path = folder[0];
    await ensureGitRepo(path);
    const embeddableFiles = await getEmbeddableFiles(path);
    const allChunks = await chunkFiles(embeddableFiles, path);
    const embeddingList = await embedChunks(allChunks);
}