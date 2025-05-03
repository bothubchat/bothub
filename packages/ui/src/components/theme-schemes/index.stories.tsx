import { StoryObj, Meta } from '@storybook/react';
import { ThemeSchemes } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type ThemeSchemesStory = StoryObj<typeof ThemeSchemes>;
export type ThemeSchemesMeta = Meta<typeof ThemeSchemes>;

export const Basic: StoryObj = {
  args: {}
};

export default {
  title: 'Components/ThemeSchemes',
  component: ThemeSchemes,
  decorators: [StoryDecorator()]
} as ThemeSchemesMeta;
