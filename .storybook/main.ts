import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

export const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-links'),
  ],

  framework: { name: getAbsolutePath('@storybook/react-vite'), options: {} },
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      resolve: {
        alias: {
          '@/ui': fileURLToPath(new URL('../packages/ui/src', import.meta.url)),
        },
      },
    });
  },
};

export default config;
