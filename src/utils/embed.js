import 'dotenv/config';
import AppError from './appError.js';
import { StatusCodes } from 'http-status-codes';

const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction';

export async function embedChunks(allChunks) {
    const texts = allChunks.map(chunk => chunk.content);

    const res = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: texts })
    });

    const json = await res.json();

    return allChunks.map((chunk, i) => ({
        ...chunk,
        embedding: json[i],
    }));
}