import 'dotenv/config';
import AppError from '../utils/appError.js';
import { getContextChunks } from './contextChunks.js';
import { generateResponse } from './generateResponse.js';

export async function handleChat(collectionName, query) {
    const hfToken = process.env.HF_API_TOKEN
    const modelURL = 'https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction';

    const embeddingResponse = await fetch(modelURL, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: query, options: { wait_for_model: true } }),
    })

    if (!embeddingResponse.ok) {
        throw new AppError(`Failed to embed query: ${embeddingResponse.statusText}`);
    }

    const queryEmbedding = await embeddingResponse.json();
    const embeddingVector = Array.isArray(queryEmbedding[0]) ? queryEmbedding[0] : queryEmbedding;

    const contextChunks = await getContextChunks(collectionName, embeddingVector);
    const llmResponseStream = await generateResponse(contextChunks, query);
    return llmResponseStream;
}