import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  BadgeMatrix,
  DividerMatrix,
  NestedTheme,
  Overrides,
  SkeletonMatrix,
  TypographyMatrix,
} from '.';

export type ZeroRuntimeMeta = Meta<typeof TypographyMatrix>;

export type ZeroRuntimeStory = StoryObj<typeof TypographyMatrix>;

export const Typography: ZeroRuntimeStory = {
  render: () => <TypographyMatrix />,
};

export const Badge: ZeroRuntimeStory = {
  render: () => <BadgeMatrix />,
};

export const Skeleton: ZeroRuntimeStory = {
  render: () => <SkeletonMatrix />,
};

export const Divider: ZeroRuntimeStory = {
  render: () => <DividerMatrix />,
};

export const StyledOverrides: ZeroRuntimeStory = {
  render: () => <Overrides />,
};

export const NestedThemeProvider: ZeroRuntimeStory = {
  render: () => <NestedTheme />,
};

export default {
  title: 'Zero-runtime CSS/Pilot',
  component: TypographyMatrix,
  decorators: [StoryDecorator()],
} as ZeroRuntimeMeta;
