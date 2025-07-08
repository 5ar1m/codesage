import fs from 'fs/promises';
import path from 'path';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function chunkFiles(filePaths, projectPath) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const allChunks = [];

    for (const file of filePaths) {
        const content = await fs.readFile(file, 'utf8');
        const relativePath = path.relative(projectPath, file);

        const chunks = await splitter.splitText(content);

        for (let i = 0; i < chunks.length; i++) {
            allChunks.push({
                content: chunks[i],
                metadata: {
                    source: relativePath,
                    chunk: i+1,
                }
            });
        }
    }

    return allChunks;
}