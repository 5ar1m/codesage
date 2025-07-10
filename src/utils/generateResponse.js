import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import 'dotenv/config';

export async function generateResponse(contextChunks, query) {
    const context = contextChunks.map(c => c.pageContent).join('\n\n')

    const prompt = PromptTemplate.fromTemplate(`
        You are a helpful codebase assistant. Use the context below to answer the question.

        Context:
        {context}

        Question:
        {question}
    `);

    const llm = new HuggingFaceInference({
        apiKey: process.env.HF_API_TOKEN,
        model: 'HuggingFaceH4/zephyr-7b-beta'
    });

    const chain = RunnableSequence.from([
        prompt,
        llm,
    ])

    const stream = await chain.stream({
        context,
        question: query,
    })

    return stream;
}