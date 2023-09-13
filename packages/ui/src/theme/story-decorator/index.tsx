import React from 'react';
import { StoryFn } from '@storybook/react';
import { ThemeProvider } from '..';

export const ThemeStoryDecorator = () => (Story: StoryFn): React.ReactElement => (
  <ThemeProvider sbMode>
    <Story />
  </ThemeProvider>
);
