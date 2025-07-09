import { client } from '../config/chromadb.js';
import { MyEmbeddingClass } from '../utils/embeddingClass.js';

export async function storeEmbeddings(embeddingList, projectPath) {
    const pathParts = projectPath.split('/');
    const source = pathParts.filter(Boolean).pop();
    const collectionName = `${source}-${Date.now()}`;

    const collection = await client.getOrCreateCollection({
        name: collectionName,
        embeddingFunction: new MyEmbeddingClass()
    });

    const ids = embeddingList.map((c, i) => `chunkId-${i+1}`);
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