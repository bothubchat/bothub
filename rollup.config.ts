import path, { join } from 'path';
import { defineConfig, ExternalOption, Plugin, RollupOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';
import nodeExternals from 'rollup-plugin-node-externals';
import babel from '@rollup/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';

export interface CreateConfigOptions {
  packageName: string;
}

export function createConfig({
  packageName
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
      ...packageConfig.dependencies
    })
  ];
  const aliasPlugin: Plugin = alias({
    entries: [{ find: `@/${packageName}`, replacement: srcPath }]
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
            `packages/${packageName}/src`
          )
        }
      ],
      plugins: [
        commonjs({
          include: 'node_modules/**'
        }),
        del({
          targets: [join(distPath, './*')],
          runOnce: true
        }),
        aliasPlugin,
        nodeExternals(),
        nodeResolve({
          extensions: ['.css', '.ts', '.tsx', '.js', '.jsx']
        }),
        esbuild({
          tsconfig: join(rootPath, './tsconfig.json'),
          exclude: ['**/*.stories.ts'],
          sourceMap: false
        }),
        visualizer(),
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
                displayName: true
              }
            ]
          ]
        }),
        image({
          include: ['**/*.png', '**/*.svg', '**/*.webp']
        }),
        postcss(),
        terser(),
        typescript({
          tsconfig: join(packagePath, './tsconfig.json'),
          rootDir: srcPath,
          declaration: true,
          declarationDir: distPath,
          exclude: [
            './**/*.stories.ts',
            './**/*.stories.tsx',
            './packages/*/tests',
            './**/*.test.ts',
            './**/*.test.tsx'
          ]
        }),
        eslint({})
      ],
      external
    }
  ];
}

export const createUiConfig = () =>
  createConfig({
    packageName: 'ui'
  });

export default defineConfig([...createUiConfig()]);
