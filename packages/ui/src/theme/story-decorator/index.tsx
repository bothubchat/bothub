import './style.css';
import React from 'react';
import { StoryFn } from '@storybook/react';
import { ThemeProvider } from '..';
import { PageScrollbar } from '../../styles';

export const ThemeStoryDecorator = () => (Story: StoryFn): React.ReactElement => (
  <ThemeProvider sbMode>
    <Story />
    <PageScrollbar />
  </ThemeProvider>
);
