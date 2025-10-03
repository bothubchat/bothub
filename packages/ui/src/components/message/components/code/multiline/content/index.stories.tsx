import 'katex/dist/katex.min.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { MessageMultilineCodeContent } from '.';

export type MessageMultilineCodeContentMeta = Meta<
  typeof MessageMultilineCodeContent
>;

export type MessageMultilineCodeContentStory = StoryObj<
  typeof MessageMultilineCodeContent
>;

export const Basic: MessageMultilineCodeContentStory = {
  args: {
    children: `function main() {
  console.log("Hello, World!"); const response = await fetch('example.com', { method: 'GET' })
}
`,
  },
};

export default {
  title: 'Components/Message/Components/MessageMultilineCodeContent',
  component: MessageMultilineCodeContent,
  decorators: [StoryDecorator()],
  argTypes: {},
} as MessageMultilineCodeContentMeta;
