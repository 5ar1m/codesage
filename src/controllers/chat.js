import { handleChat } from '../utils/handleChat.js';

export async function chatController (req, res) {
    const { collectionName, query } = req.body;

    const stream = await handleChat(collectionName, query);

    for await (const chunk of stream) {
        req.app.get('io').emit('llm-token', chunk);
    }

    req.app.get('io').emit('llm-done');
}