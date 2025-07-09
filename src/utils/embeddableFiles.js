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
        onlyFiles: true,
        absolute: true,
    });

    const alwaysExclude = ['package-lock.json'];

    const filteredFiles = allFiles.filter(absPath => {
        const relPath = path.relative(projectPath, absPath).split(path.sep).join('/'); // POSIX path
            return !ig.ignores(relPath) && !alwaysExclude.includes(relPath);
    });

    return filteredFiles;
}
