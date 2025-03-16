import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { FooterMobile } from '.';

export type FooterMobileMeta = Meta<typeof FooterMobile>;

export type FooterMobileStory = StoryObj<typeof FooterMobile>;

export const Mobile: FooterMobileStory = {};

export default {
  title: 'Components/Footer',
  component: FooterMobile,
  decorators: [StoryDecorator()]
} as FooterMobileMeta;
