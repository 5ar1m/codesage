import fileDialog from 'node-file-dialog';
import { handleCodebase } from '../utils/handleCodebase.js';
import { getLastCommitId } from '../utils/lastCommit.js';
import { updateEmbeddings } from '../utils/updateEmbeddings.js';

export async function selectCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    const path = folder[0];
    const codebaseInfo = await handleCodebase(path);
    const lastCommitId = await getLastCommitId(path);
    if (lastCommitId !== codebaseInfo.lastCommit) {
        await updateEmbeddings(codebaseInfo);
    }
    return res.json({
        collectionName: codebaseInfo.collectionName,
        projectPath: codebaseInfo.projectPath  
    });
}