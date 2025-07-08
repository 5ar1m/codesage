import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { globby } from 'globby';
import ignore from 'ignore';

const ig = ignore();
const readFile = promisify(fs.readFile);

export async function getEmbeddableFiles(projectPath) {
    const gitignorePath = path.join(projectPath, '.gitignore');

    const gitignoreContent = await readFile(gitignorePath, 'utf8');
    ig.add(gitignoreContent);

    const allFiles = await globby(['**/*'], {
        cwd: projectPath,
        dot: false,
        onlyFiles: true,
        absolute: true,
    });

    const relativePaths = allFiles.map(f => path.relative(projectPath, f));
    const filtered = relativePaths.filter(f => !ig.ignores(f));

    return filtered.map(f => path.join(projectPath, f));
}
