import path, { join } from 'path';
import { defineConfig, ExternalOption, Plugin, RollupOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import { readFileSync } from 'fs';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';
import nodeExternals from 'rollup-plugin-node-externals';
import babel from '@rollup/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';
import commonjs from '@rollup/plugin-commonjs';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import ts from 'typescript';

export interface CreateConfigOptions {
  packageName: string;
}

/**
 * Compiles TypeScript file by file with the package tsconfig (ES2015 target,
 * shared tslib helpers), without the type check: types are checked and
 * declarations are emitted by separate tsc runs in scripts/build.ts.
 */
export /**
 * Imported CSS (KaTeX, the highlight.js theme) becomes a module that adds it
 * to the page with style-inject, as rollup-plugin-postcss did without any
 * postcss plugins.
 */
const cssInject = (): Plugin => ({
  name: 'css-inject',
  transform(code, id) {
    if (!id.endsWith('.css')) {
      return null;
    }

    return {
      code: [
        "import styleInject from 'style-inject';",
        `var css = ${JSON.stringify(code)};`,
        'styleInject(css);',
        'export default css;',
      ].join('\n'),
      map: { mappings: '' },
    };
  },
});

/**
 * Compiles `*.css.ts` (vanilla-extract) files: each becomes a `*.css.js`
 * module with the class names that imports its own CSS file, so an app gets
 * the CSS of the components it imports and nothing else, without runtime
 * styling. The CSS file is put next to the module (`badge.css.ts.vanilla.css`
 * beside `badge.css.js`): the stock plugin names assets by base name only,
 * which Rollup 3 places in one folder.
 */
function vanillaExtract(packagePath: string, srcPath: string): Plugin {
  const plugin = vanillaExtractPlugin({
    // Package-relative file scopes: class names don't depend on the checkout.
    cwd: packagePath,
    identifiers: process.env.NODE_ENV === 'production' ? 'short' : 'debug',
  }) as Plugin;
  const emittedAssets = new Map<string, string>();

  return {
    ...plugin,
    buildStart(options) {
      emittedAssets.clear();
      const { buildStart } = plugin;
      return typeof buildStart === 'function'
        ? buildStart.call(this, options)
        : undefined;
    },
    renderChunk(code, chunk) {
      let output = code;
      chunk.imports.forEach((importPath) => {
        const moduleInfo = this.getModuleInfo(importPath);
        if (!moduleInfo?.meta.css) {
          return;
        }

        let referenceId = emittedAssets.get(moduleInfo.id);
        if (!referenceId) {
          referenceId = this.emitFile({
            type: 'asset',
            // The id is relative to the plugin's cwd, the package folder.
            fileName: path.relative(
              srcPath,
              path.resolve(packagePath, moduleInfo.id),
            ),
            source: moduleInfo.meta.css,
          });
          emittedAssets.set(moduleInfo.id, referenceId);
        }

        const assetPath = path.posix.relative(
          path.posix.dirname(chunk.fileName),
          this.getFileName(referenceId),
        );
        output = output
          .split(importPath)
          .join(assetPath.startsWith('.') ? assetPath : `./${assetPath}`);
      });

      return { code: output, map: null };
    },
  };
}

function typescriptTranspile(tsconfigPath: string): Plugin {
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
    // the runtime of the compiled recipes (`@vanilla-extract/recipes/createRuntimeFn`)
    /^@vanilla-extract\/recipes(\/|$)/,
    // The app's own JSX runtime: a bundled copy of React's (CommonJS) one
    // reads client-only internals in development and breaks the components
    // that render in React Server Components.
    /^react\/jsx(-dev)?-runtime$/,
  ];
  const aliasPlugin: Plugin = alias({
    entries: [{ find: `@/${packageName}`, replacement: srcPath }],
  });

  return [
    {
      input: path.resolve(srcPath, './index.ts'),
      treeshake: {
        // Rollup keeps the imports of a module it skips (e.g. tooltip/index.js,
        // passed through only for `useTooltip`) in every importer as bare
        // `import "react-markdown"` / `import "@react-spring/web"`. Packages
        // without a `sideEffects` flag (@react-spring/web) are then loaded and
        // run by every page that has a Button or an icon. Nothing imports an
        // external package for its side effects, so those imports are dropped,
        // except the CSS files of the vanilla-extract styles (`*.css.ts`), which
        // are imported only for it. Our own modules keep the default: styled
        // components register their CSS in import order, and it must not change.
        moduleSideEffects: (id, external) => !external || id.endsWith('.css'),
        // An icon module only wraps its component, so an icon picked from the
        // icons barrel doesn't leave a bare import of all the others behind.
        manualPureFunctions: ['icon'],
      },
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
        vanillaExtract(packagePath, srcPath),
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
                // Component names in class names only help debugging: in a
                // published build they add ~11 KB gzip of JS to the app and
                // ~3 KB to every prerendered HTML. `yarn dev` keeps them.
                displayName: process.env.NODE_ENV !== 'production',
              },
            ],
          ],
        }),
        image({
          include: ['**/*.png', '**/*.svg', '**/*.webp'],
        }),
        cssInject(),
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
