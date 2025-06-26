import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Checkbox, CheckboxLabel } from '.';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type CheckboxMeta = Meta<typeof Checkbox>;

export type CheckboxStory = StoryObj<typeof Checkbox>;

export const Basic: CheckboxStory = {
  args: {
    label: 'Отправлять автоматически'
  }
};

export const Help: CheckboxStory = {
  args: {
    label: (
      <CheckboxLabel>
        Отправлять автоматически
        <Tooltip label="Help">
          <Button variant="help" />
        </Tooltip>
      </CheckboxLabel>
    )
  }
};

export const Disabled: CheckboxStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const DisabledChecked: CheckboxStory = {
  args: {
    ...Disabled.args,
    checked: true
  }
};

export const Skeleton: CheckboxStory = {
  args: {
    ...Basic.args,
    skeleton: true
  }
};

export default {
  title: 'UI Components/Checkbox',
  component: Checkbox,
  decorators: [StoryDecorator({ margin: '50px 0px' })]
} as CheckboxMeta;
