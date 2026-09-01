import simpleGit, { SimpleGit } from 'simple-git';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import path from 'path';
import { readFile, readdir } from 'fs/promises';

const git: SimpleGit = simpleGit();

function run(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`${command} ${args.join(' ')} exited with code ${code}`),
      );
    });
  });
}

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

    const packageDir = path.resolve('./packages', packageFolderName);
    const packageJsonPath = path.resolve(packageDir, './package.json');
    // eslint-disable-next-line no-await-in-loop
    const packageJson = JSON.parse(
      // eslint-disable-next-line no-await-in-loop
      await readFile(packageJsonPath, 'utf-8'),
    ) as {
      name: string;
      version: string;
    };

    const packageTag =
      currentBranch === 'main' ? 'latest' : currentBranch.replace(/\//g, '-');
    let packageVersion =
      packageJson.version.match(/^([0-9]+\.[0-9]+\.[0-9]+)/)?.[0] ??
      packageJson.version;

    if (currentBranch !== 'main') {
      packageVersion += `-${packageTag}-${randomUUID()}`;
    }

    if (packageJson.version !== packageVersion) {
      // eslint-disable-next-line no-await-in-loop
      await run(
        'npm',
        ['version', packageVersion, '--no-git-tag-version', '--ignore-scripts'],
        packageDir,
      );
    }

    // eslint-disable-next-line no-await-in-loop
    await run(
      'npm',
      ['publish', '--tag', packageTag, '--access', 'public'],
      packageDir,
    );

    // eslint-disable-next-line no-console
    console.log(`yarn add ${packageJson.name}@${packageVersion}`);
  }
}

publish().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
