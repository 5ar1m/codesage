import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import 'dotenv/config';

export async function generateResponse(contextChunks, query) {
    const context = contextChunks.map(c => c.pageContent).join('\n\n');

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a helpful codebase assistant. Use the context below to answer the question."],
        ["human", "Context:\n{context}\n\nQuestion:\n{question}"],
    ]);

    const chatModel = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: 'models/gemini-2.5-pro',
        streaming: true,
    });

    const chain = RunnableSequence.from([
        prompt,
        chatModel,
    ]);

    const stream = await chain.stream({
        context,
        question: query,
    });

    return stream;
}