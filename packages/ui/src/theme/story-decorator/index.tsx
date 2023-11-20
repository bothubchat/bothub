import 'normalize.css';
import 'swiper/css';
import 'highlight.js/styles/base16/atlas.css';
import './style.css';
import React from 'react';
import { StoryContext, StoryFn } from '@storybook/react';
import { ThemeMode, ThemeProvider } from '@/ui/theme';
import { BothubGlobalStyle } from '@/ui/styles';
import { PortalElement } from '@/ui/components/portal';

export interface ThemeStoryDecoratorOptions {
  margin?: string;
}

export const ThemeStoryDecorator = ({ 
  margin 
}: ThemeStoryDecoratorOptions = {}) => (Story: StoryFn, context: StoryContext)
: React.ReactElement => {
  const isLightMode = context.globals.backgrounds?.value === '#FFFFFF';
  const themeMode: ThemeMode = isLightMode ? 'light' : 'dark';

  return (
    <ThemeProvider
      mode={themeMode}
      sbMode
    >
      <Story />
      <BothubGlobalStyle 
        margin={margin}
      />
      <PortalElement />
    </ThemeProvider>
  );
};
