import 'normalize.css';
import 'highlight.js/styles/base16/atlas.css';
import './style.css';
import React from 'react';
import { StoryContext, StoryFn } from '@storybook/react';
import { ThemeMode } from '@/ui/theme';
import { BothubGlobalStyleProps } from '@/ui/styles';
import { PortalElement } from '@/ui/components/portal';
import { BothubUIProvider } from '@/ui/provider';

export interface StoryDecoratorOptions extends BothubGlobalStyleProps {}

export const StoryDecorator = ({ 
  ...props 
}: StoryDecoratorOptions = {}) => (Story: StoryFn, context: StoryContext)
: React.ReactElement => {
  const isLightMode = context.globals.backgrounds?.value === '#FFFFFF';
  const themeMode: ThemeMode = isLightMode ? 'light' : 'dark';

  return (
    <BothubUIProvider
      theme={{
        mode: themeMode
      }}
      globalStyle={{
        ...props,
        scale: props.scale ?? 'main'
      }}
    >
      <Story />
      <PortalElement />
    </BothubUIProvider>
  );
};
