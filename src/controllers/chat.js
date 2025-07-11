import { handleChat } from '../utils/handleChat.js';

export async function chatController (req, res) {
    const { collectionName, query } = req.body;

    const stream = await handleChat(collectionName, query);

    for await (const chunk of stream) {
        const content = chunk?.content;
        if (content) {
            req.app.get('io').emit('llm-token', content);
        }
    }

    return req.app.get('io').emit('llm-done');
}