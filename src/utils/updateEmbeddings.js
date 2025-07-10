import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { removeEmbeddingsByFile } from '../services/removeEmbeddings.js';
import { updateLastCommit } from './updateLastCommit.js';
import { chunkFiles } from '../utils/chunk.js';
import { embedChunks } from '../utils/embed.js';
import { storeEmbeddings } from '../services/storeEmbeddings.js';

export async function updateEmbeddings(codebaseInfo) {
    const projectPath = codebaseInfo.projectPath;
    const storedCommitId = codebaseInfo.lastCommit;
    const git = simpleGit(projectPath);

    const rawDiff = await git.raw(['diff', '--name-status', `${storedCommitId}..HEAD`]);

    const changes = rawDiff
        .trim()
        .split('\n')
        .map(line => {
            const [status, ...paths] = line.trim().split('\t');
            return { status, paths };
        });

    for (const { status, paths } of changes) {
        const [oldPath, newPath] = paths;

        switch (status[0]) {
            case 'D': {
                // file deleted
                await removeEmbeddingsByFile(codebaseInfo.collectionName, oldPath);
                break;
            }

            case 'R': {
                // file renamed
                await removeEmbeddingsByFile(codebaseInfo.collectionName, oldPath);

                const fullNewPath = path.join(projectPath, newPath);
                if (fs.existsSync(fullNewPath)) {
                    const allChunks = await chunkFiles([fullNewPath], projectPath);
                    const embeddingList = await embedChunks(allChunks);
                    await storeEmbeddings(embeddingList, projectPath, codebaseInfo.collectionName);
                }
                break;
            }

            case 'M': {
                // file modified
                await removeEmbeddingsByFile(codebaseInfo.collectionName, oldPath);
                const fullPath = path.join(projectPath, oldPath);
                if (fs.existsSync(fullPath)) {
                    const allChunks = await chunkFiles([fullPath], projectPath);
                    const embeddingList = await embedChunks(allChunks);
                    await storeEmbeddings(embeddingList, projectPath, codebaseInfo.collectionName);
                }
                break;
            }

            case 'A': {
                // new file added
                const fullPath = path.join(projectPath, oldPath);
                if (fs.existsSync(fullPath)) {
                    const allChunks = await chunkFiles([fullPath], projectPath);
                    const embeddingList = await embedChunks(allChunks);
                    await storeEmbeddings(embeddingList, projectPath, codebaseInfo.collectionName);
                }
                break;
            }
        }
    }

    const latestCommit = await git.revparse(['HEAD']);
    await updateLastCommit(projectPath, latestCommit);
}