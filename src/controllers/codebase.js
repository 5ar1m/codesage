import fileDialog from 'node-file-dialog';

export async function addCodebase(req, res) {
    const folder = await fileDialog({ type: 'directory' });
    return res.json({ path: folder[0] });
}