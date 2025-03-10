import type { Preview } from '@storybook/react';

export const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0E0C15'
        },
        {
          name: 'light',
          value: '#FFFFFF'
        }
      ]
    },
    actions: {
      argTypesRegex: '^on[A-Z].*'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
