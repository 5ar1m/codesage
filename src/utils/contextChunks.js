import { client } from '../config/chromadb.js';

export async function getContextChunks(collectionName, embeddingVector) {
    const collection = await client.getCollection({ name: collectionName });
    
    const results = await collection.query({
        queryEmbeddings: [embeddingVector],
        nResults: 5,
    })

    const documents = results.documents?.[0] || [];
    const contextChunks = documents.map(doc => ({ pageContent: doc }));
    return contextChunks;
}