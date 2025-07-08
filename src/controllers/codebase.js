import fileDialog from 'node-file-dialog';
import { ensureGitRepo } from '../utils/ensureGitRepo.js';

export async function addCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    const path = folder[0];
    ensureGitRepo(path);
}