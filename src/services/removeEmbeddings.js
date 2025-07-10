import { client } from '../config/chromadb.js';
import { MyEmbeddingClass } from '../utils/embeddingClass.js';

export async function removeEmbeddingsByFile(collectionName, relativePath) {
    const collection = await client.getCollection({
        name: collectionName,
        embeddingFunction: new MyEmbeddingClass()
        });
    await collection.delete({ 
        where: { 
            source: { $eq: relativePath }
        } 
    });
}