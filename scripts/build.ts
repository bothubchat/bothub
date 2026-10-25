import { spawn } from 'child_process';
import { watch } from 'fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import path from 'path';

const rootPath: string = process.cwd();
const packageNames: string[] = ['ui'];
const declarationsFolderName: string = '.types';
const isWatchMode: boolean = process.argv.includes('--watch');

function getPackagePaths(packageName: string) {
  const packagePath = path.join(rootPath, 'packages', packageName);

  return {
    packagePath,
    declarationsPath: path.join(packagePath, declarationsFolderName),
    distPath: path.join(packagePath, 'dist'),
  };
}

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootPath,
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

async function listFiles(folderPath: string): Promise<string[]> {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(folderPath, entry.name);

      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );

  return files.flat();
}

/**
 * Declarations are emitted with the `@/<package>/...` path alias that only
 * exists in this repo's tsconfig. Rewrite every such specifier to a path
 * relative to the declaration file, so consumers can resolve the types.
 */
function rewritePathAlias(
  source: string,
  fileName: string,
  packageName: string,
): string {
  const aliasPrefix = `@/${packageName}/`;
  if (!source.includes(aliasPrefix)) {
    return source;
  }

  const specifierPattern = new RegExp(
    `(['"])@/${packageName}/([^'"]+)\\1`,
    'g',
  );
  const fileFolder = path.posix.dirname(fileName);

  return source.replace(
    specifierPattern,
    (_match, quote: string, target: string) => {
      const relativePath = path.posix.relative(fileFolder, target) || '.';
      const specifier = relativePath.startsWith('.')
        ? relativePath
        : `./${relativePath}`;

      return `${quote}${specifier}${quote}`;
    },
  );
}

async function emitDeclarations(packageName: string): Promise<void> {
  const { packagePath } = getPackagePaths(packageName);

  // Types are checked by the separate typecheck task, so the emit skips it.
  await run('tsc', [
    '-p',
    path.join(packagePath, 'tsconfig.build.json'),
    '--noCheck',
    ...(isWatchMode ? ['--watch', '--preserveWatchOutput'] : []),
  ]);
}

async function copyDeclarations(packageName: string): Promise<void> {
  const { declarationsPath, distPath } = getPackagePaths(packageName);

  const filePaths = await listFiles(declarationsPath);

  await Promise.all(
    filePaths.map(async (filePath) => {
      const fileName = path
        .relative(declarationsPath, filePath)
        .split(path.sep)
        .join(path.posix.sep);
      const source = await readFile(filePath, 'utf8');
      const outputPath = path.join(distPath, fileName);

      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(
        outputPath,
        rewritePathAlias(source, fileName, packageName),
      );
    }),
  );
}

async function copyDeclarationsOnChange(packageName: string): Promise<void> {
  const { declarationsPath } = getPackagePaths(packageName);
  let timeoutId: NodeJS.Timeout | undefined;

  await rm(declarationsPath, { recursive: true, force: true });
  await mkdir(declarationsPath, { recursive: true });
  watch(declarationsPath, { recursive: true }, () => {
    // tsc writes many files per change, copy them once it is done.
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      copyDeclarations(packageName).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }, 300);
  });
}

const rollupArgs: string[] = [
  '--config',
  './rollup.config.ts',
  '--configPlugin',
  'esbuild',
];

async function build(): Promise<void> {
  await Promise.all(
    packageNames.map((packageName) =>
      rm(getPackagePaths(packageName).declarationsPath, {
        recursive: true,
        force: true,
      }),
    ),
  );
  // Bundling, declarations and the type check don't depend on each other.
  await Promise.all([
    run('rollup', rollupArgs),
    ...packageNames.map(emitDeclarations),
    run('tsc', ['--noEmit', '-p', './tsconfig.json']),
  ]);

  // Rollup clears dist when it starts, so the declarations go in afterwards.
  await Promise.all(
    packageNames.map(async (packageName) => {
      await copyDeclarations(packageName);
      await rm(getPackagePaths(packageName).declarationsPath, {
        recursive: true,
        force: true,
      });
    }),
  );
}

async function watchBuild(): Promise<void> {
  // Rollup doesn't clear dist in watch mode, so the copied declarations stay.
  await Promise.all(
    packageNames.map((packageName) =>
      rm(getPackagePaths(packageName).distPath, {
        recursive: true,
        force: true,
      }),
    ),
  );
  await Promise.all(packageNames.map(copyDeclarationsOnChange));
  await Promise.all([
    run('rollup', ['--watch', ...rollupArgs]),
    ...packageNames.map(emitDeclarations),
  ]);
}

(isWatchMode ? watchBuild() : build()).catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
