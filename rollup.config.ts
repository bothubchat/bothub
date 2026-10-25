import path, { join } from 'path';
import { defineConfig, ExternalOption, Plugin, RollupOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import { readFileSync } from 'fs';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';
import nodeExternals from 'rollup-plugin-node-externals';
import babel from '@rollup/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'typescript';

export interface CreateConfigOptions {
  packageName: string;
}

/**
 * Compiles TypeScript file by file with the package tsconfig (ES2015 target,
 * shared tslib helpers), without the type check: types are checked and
 * declarations are emitted by separate tsc runs in scripts/build.ts.
 */
export function typescriptTranspile(tsconfigPath: string): Plugin {
  const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(tsconfigPath),
  );
  const compilerOptions: ts.CompilerOptions = {
    ...options,
    declaration: false,
    emitDeclarationOnly: false,
    noEmit: false,
    sourceMap: false,
  };

  return {
    name: 'typescript-transpile',
    transform(code, id) {
      if (!/\.tsx?$/.test(id) || id.endsWith('.d.ts')) {
        return null;
      }

      const { outputText } = ts.transpileModule(code, {
        compilerOptions,
        fileName: id,
      });

      return { code: outputText, map: null };
    },
  };
}

export function createConfig({
  packageName,
}: CreateConfigOptions): RollupOptions[] {
  const rootPath: string = process.cwd();
  const packagesPath: string = join(rootPath, './packages');
  const packagePath: string = join(packagesPath, packageName);
  const packageConfigPath: string = join(packagePath, './package.json');
  const packageConfig = JSON.parse(readFileSync(packageConfigPath).toString());
  const srcPath: string = join(packagePath, './src');
  const distPath: string = path.resolve(packagePath, './dist');
  const external: ExternalOption = [
    ...Object.keys({
      ...packageConfig.peerDependencies,
      ...packageConfig.devDependencies,
      ...packageConfig.dependencies,
    }),
    // type-only import (@types/mdast), never bundled
    'mdast',
  ];
  const aliasPlugin: Plugin = alias({
    entries: [{ find: `@/${packageName}`, replacement: srcPath }],
  });

  return [
    {
      input: path.resolve(srcPath, './index.ts'),
      output: [
        {
          dir: distPath,
          format: 'es',
          externalLiveBindings: false,
          preserveModules: true,
          preserveModulesRoot: path.resolve(
            rootPath,
            `packages/${packageName}/src`,
          ),
        },
      ],
      plugins: [
        commonjs({
          include: 'node_modules/**',
        }),
        // In watch mode scripts/build.ts clears dist once, before the
        // declarations are copied into it.
        ...(process.env.ROLLUP_WATCH
          ? []
          : [
              del({
                targets: [join(distPath, './*')],
                runOnce: true,
              }),
            ]),
        aliasPlugin,
        nodeExternals(),
        nodeResolve({
          extensions: ['.css', '.ts', '.tsx', '.js', '.jsx'],
        }),
        typescriptTranspile(join(packagePath, './tsconfig.json')),
        esbuild({
          tsconfig: join(rootPath, './tsconfig.json'),
          exclude: ['**/*.stories.ts'],
          sourceMap: false,
        }),
        // Bundle treemap (stats.html) only on demand: ANALYZE=1 yarn build
        ...(process.env.ANALYZE ? [visualizer()] : []),
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          extensions: ['.js', '.ts', '.tsx'],
          presets: ['@babel/preset-react'],
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                ssr: true,
                displayName: true,
              },
            ],
          ],
        }),
        image({
          include: ['**/*.png', '**/*.svg', '**/*.webp'],
        }),
        postcss(),
        terser(),
      ],
      external,
    },
  ];
}

export const createUiConfig = () =>
  createConfig({
    packageName: 'ui',
  });

export default defineConfig([...createUiConfig()]);
