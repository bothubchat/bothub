import path, { join } from 'path';
import { defineConfig } from 'rollup';
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

function createConfig({ packageName, }) {
    const rootPath = process.cwd();
    const packagesPath = join(rootPath, './packages');
    const packagePath = join(packagesPath, packageName);
    const packageConfigPath = join(packagePath, './package.json');
    const packageConfig = JSON.parse(readFileSync(packageConfigPath).toString());
    const srcPath = join(packagePath, './src');
    const distPath = path.resolve(packagePath, './dist');
    const external = [
        ...Object.keys(Object.assign(Object.assign(Object.assign({}, packageConfig.peerDependencies), packageConfig.devDependencies), packageConfig.dependencies)),
        'unified',
        'remark-parse',
        'remark-gfm',
        'mdast',
        'mdast-util-to-markdown',
    ];
    const aliasPlugin = alias({
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
                    preserveModulesRoot: path.resolve(rootPath, `packages/${packageName}/src`),
                },
            ],
            plugins: [
                commonjs({
                    include: 'node_modules/**',
                }),
                del({
                    targets: [join(distPath, './*')],
                    runOnce: true,
                }),
                aliasPlugin,
                nodeExternals(),
                nodeResolve({
                    extensions: ['.css', '.ts', '.tsx', '.js', '.jsx'],
                }),
                esbuild({
                    tsconfig: join(rootPath, './tsconfig.json'),
                    exclude: ['**/*.stories.ts'],
                    sourceMap: false,
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
                        './**/*.test.tsx',
                    ],
                }),
                eslint({}),
            ],
            external,
        },
    ];
}
const createUiConfig = () => createConfig({
    packageName: 'ui',
});
var rollup_config = defineConfig([...createUiConfig()]);

export { createConfig, createUiConfig, rollup_config as default };
