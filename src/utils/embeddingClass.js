import AppError from '../utils/appError.js';

export class MyEmbeddingClass {
    constructor() {}

    async embed(texts) {
        throw new AppError('Custom Embedding Function Called');
    }
}