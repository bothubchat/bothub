import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

export const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-onboarding'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@/ui': '/packages/ui/src',
        },
      },
    });
  },
};

export default config;
