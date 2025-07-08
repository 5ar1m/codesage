import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import simpleGit from 'simple-git';

export async function ensureGitRepo(projectPath) {
    const git = simpleGit(projectPath);

    const isRepo = await git.checkIsRepo();
    if (isRepo) {
        return ;
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const source = path.resolve(__dirname, '../../.gitignore_template');

    const target = path.join(projectPath, '.gitignore');
    fs.copyFileSync(source, target);

    await git.init();
    await git.add('.');
    const timestamp = new Date().toISOString();
    await git.commit(`codesage commit ${timestamp}`);
}