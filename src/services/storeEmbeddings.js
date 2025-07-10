import { client } from '../config/chromadb.js';
import { MyEmbeddingClass } from '../utils/embeddingClass.js';

export async function storeEmbeddings(embeddingList, projectPath, collectionName = '') {
    if (embeddingList.length === 0) {
        return ;
    }
    const pathParts = projectPath.split('/');
    const source = pathParts.filter(Boolean).pop();

    if (collectionName === '') {
        collectionName = `${source}-${Date.now()}`;
    }

    const collection = await client.getOrCreateCollection({
        name: collectionName,
        embeddingFunction: new MyEmbeddingClass()
    });

    const ids = embeddingList.map((c, i) => `chunkId-${Date.now()}-${i}`);
    const documents = embeddingList.map(c => c.content);
    const embeddings = embeddingList.map(c => c.embedding);
    const metadatas = embeddingList.map(c => c.metadata);

    await collection.add({
        ids,
        documents,
        embeddings,
        metadatas
    });

    return collectionName;
}