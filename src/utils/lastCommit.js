import simpleGit from 'simple-git';

export async function getLastCommitId (projectPath) {
    const git = simpleGit(projectPath);
    const log = await git.log();
    return log.latest.hash;
};