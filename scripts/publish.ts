import simpleGit, { SimpleGit } from 'simple-git';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import path from 'path';
import { readFile, readdir } from 'fs/promises';

const git: SimpleGit = simpleGit();

async function publish(): Promise<void> {
  const { current: currentBranch } = await git.status();

  if (!currentBranch) {
    return;
  }

  for (const packageFolderName of await readdir(path.resolve('./packages'))) {
    if (packageFolderName.startsWith('.')) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const packageJsonPath = path.resolve(
      './packages/',
      packageFolderName,
      './package.json',
    );
    // eslint-disable-next-line
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));

    const packageName: string = packageJson.name;

    let packageTag: string;
    if (currentBranch === 'main') {
      packageTag = 'latest';
    } else {
      packageTag = currentBranch.replace(/\//g, '-');
    }

    let packageVersion: string =
      (packageJson.version as string).match(
        /^([0-9]+\.[0-9]+\.[0-9]+)/g,
      )?.[0] ?? packageJson.version;
    if (currentBranch !== 'main') {
      packageVersion += `-${packageTag}-${randomUUID()}`;
    }

    // eslint-disable-next-line
    await new Promise<void>((resolve) => {
      const process = spawn(
        'yarn',
        ['publish', '--tag', packageTag, '--new-version', packageVersion],
        {
          cwd: path.resolve('./packages', packageFolderName),
          stdio: 'inherit',
          shell: true,
        },
      );

      process.on('close', () => resolve());
    });

    // eslint-disable-next-line
    console.log(`yarn add ${packageName}@${packageVersion}`);
  }
}

publish();
