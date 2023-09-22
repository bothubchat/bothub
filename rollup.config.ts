import { join } from 'path';
import { defineConfig, ExternalOption, RollupOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import { readFileSync, copyFileSync } from 'fs';

export interface CreateConfigOptions {
  packageName: string;
}

export function createConfig({ packageName }: CreateConfigOptions): RollupOptions[] {
  const rootPath: string = process.cwd();
  const packagesPath: string = join(rootPath, './packages');
  const packagePath: string = join(packagesPath, packageName);
  const packageConfigPath: string = join(packagePath, './package.json');
  const packageConfig = JSON.parse(readFileSync(packageConfigPath).toString());
  const srcPath: string = join(packagePath, './src');
  const distPath: string = join(packagePath, './dist');
  const external: ExternalOption = [
    ...Object.keys(packageConfig.peerDependencies)
  ];

  return [
    {
      input: join(srcPath, './index.ts'),
      output: [
        {
          dir: join(distPath, './es'),
          format: 'es',
          sourcemap: true,
          interop: 'compat'
        },
        {
          dir: join(distPath, './cjs'),
          format: 'cjs',
          sourcemap: true,
          interop: 'compat'
        }
      ],
      plugins: [
        commonjs(),
        esbuild({
          minify: true,
          tsconfig: join(rootPath, './tsconfig.json'),
          exclude: [
            'node_modules/**',
            '**/*.stories.ts'
          ]
        }),
        image({
          include: ['**/*.png', '**/*.svg']
        }),
        postcss({
          extract: true,
          plugins: [
            postcssImport(),
            postcssUrl({
              url: 'inline'
            })
          ]
        }),
        nodeResolve({
          extensions: ['.css', '.ts', '.tsx', '.js', '.jsx']
        })
      ],
      external
    },
    {
      input: join(srcPath, './index.ts'),
      output: [
        {
          file: join(distPath, './index.d.ts'),
          format: 'es'
        }
      ],
      plugins: [
        dts(),
        postcss({
          inject: false,
          extract: false
        }),
        {
          name: 'copy',
          buildEnd: (error) => {
            if (error) {
              throw error;
            }

            copyFileSync(join(distPath, './es/index.css'), join(distPath, './style.css'));
          }
        }
      ],
      external
    }
  ];
}

export const createUiConfig = () => (
  createConfig({
    packageName: 'ui'
  })
);

export default defineConfig([
  ...createUiConfig()
]);
