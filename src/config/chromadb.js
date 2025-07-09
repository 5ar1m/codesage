import { ChromaClient } from 'chromadb';

export const client = new ChromaClient({ path: 'http://localhost:8000' });