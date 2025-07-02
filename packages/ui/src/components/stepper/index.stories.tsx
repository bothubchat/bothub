import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Stepper } from '.';

export type StepperMeta = Meta<typeof Stepper>;

export type StepperStory = StoryObj<typeof Stepper>;

export const Basic: StepperStory = {
  args: {
    activeStep: 1,
    stepLabels: [1, 2, 3]
  }
};

export default {
  title: 'UI Components/Stepper',
  component: Stepper,
  decorators: [StoryDecorator()]
} as StepperMeta;
