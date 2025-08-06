import { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { ColorPicker } from '.';

export type ColorPickerMeta = Meta<typeof ColorPicker>;

export type ColorPickerStory = StoryObj<typeof ColorPicker>;

export const Basic: ColorPickerStory = {
  args: {
    color: '#FFFFFF',
    label: 'Акцентный цвет',
    preview: true,
  },
};

export default {
  title: 'Components/ColorPicker',
  component: (props) => (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <ColorPicker {...props} />
    </div>
  ),
  decorators: [StoryDecorator()],
} as ColorPickerMeta;
