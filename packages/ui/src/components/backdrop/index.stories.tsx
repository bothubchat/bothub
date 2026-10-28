import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { styled } from 'styled-components';
import { Backdrop } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';

export type BackdropMeta = Meta<typeof Backdrop>;

export type BackdropStory = StoryObj<typeof Backdrop>;

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
`;

const Content = () => (
  <Page>
    {Array.from({ length: 12 }, (_, index) => (
      <Card key={index}>
        <Typography variant="body-l-semibold">Карточка {index + 1}</Typography>
        <Typography>
          Под затемнением размыто. На тач-устройствах размытия нет: оно слишком
          дорогое на весь экран.
        </Typography>
      </Card>
    ))}
  </Page>
);

/** The blur is constant, only the opacity is animated */
export const Basic: BackdropStory = {
  args: {
    open: true,
  },
  render: (args) => (
    <>
      <Content />
      <Backdrop {...args} />
    </>
  ),
};

/** Opens and closes with an opacity animation; a click outside closes it */
export const Toggle: BackdropStory = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Content />
        <Backdrop
          {...args}
          open={open}
          onClick={() => setOpen(false)}
        >
          <Card>
            <Typography>Нажмите вне карточки, чтобы закрыть</Typography>
          </Card>
        </Backdrop>
      </>
    );
  },
};

export default {
  title: 'UI Components/Backdrop',
  component: Backdrop,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as BackdropMeta;
