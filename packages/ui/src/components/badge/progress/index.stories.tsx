import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { BadgeProgress, BadgeProgressText, BadgeProgressTextBold } from '.';

export type BadgeProgressMeta = Meta<typeof BadgeProgress>;

export type BadgeProgressStory = StoryObj<typeof BadgeProgress>;

export const Basic: BadgeProgressStory = {
  args: {
    value: 69,
    children: (
      <BadgeProgressText>
        <BadgeProgressTextBold>Midjourney</BadgeProgressTextBold> генерирует{' '}
        <BadgeProgressTextBold>69%</BadgeProgressTextBold>
      </BadgeProgressText>
    )
  }
};

export const WithoutValue: BadgeProgressStory = {
  args: {
    children: (
      <BadgeProgressText>
        <BadgeProgressTextBold>DALL-E 3</BadgeProgressTextBold> генерирует
      </BadgeProgressText>
    )
  }
};

export default {
  title: 'UI Components/Badge/Progress',
  component: BadgeProgress,
  decorators: [StoryDecorator()]
} as BadgeProgressMeta;
