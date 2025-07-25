import { StoryObj, Meta } from '@storybook/react';
import { ThemeSchemes } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type ThemeSchemesStory = StoryObj<typeof ThemeSchemes>;
export type ThemeSchemesMeta = Meta<typeof ThemeSchemes>;

export const Basic: ThemeSchemesStory = {
  args: {
    customTitle: 'Пользовательская тема',
    standardTitle: 'Стандартная тема',
    colorfulTitle: 'Цветная тема',
    activeScheme: 'iris',
  },
};

export default {
  title: 'Components/ThemeSchemes',
  component: ThemeSchemes,
  decorators: [StoryDecorator()],
} as ThemeSchemesMeta;
