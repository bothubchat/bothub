import 'normalize.css';
import 'swiper/css';
import 'highlight.js/styles/base16/atlas.css';
import './style.css';
import React from 'react';
import { StoryFn } from '@storybook/react';
import { ThemeProvider } from '@/ui/theme';
import { BothubGlobalStyle } from '@/ui/styles';
import { PortalElement } from '@/ui/components/portal';

export interface ThemeStoryDecoratorOptions {
  margin?: string;
}

export const ThemeStoryDecorator = ({ 
  margin 
}: ThemeStoryDecoratorOptions = {}) => (Story: StoryFn): React.ReactElement => (
  <ThemeProvider sbMode>
    <Story />
    <BothubGlobalStyle 
      margin={margin}
    />
    <PortalElement />
  </ThemeProvider>
);
