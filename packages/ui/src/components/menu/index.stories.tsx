import { Meta, StoryObj } from '@storybook/react-vite';
import { styled } from 'styled-components';
import { StoryDecorator } from '@/ui/story-decorator';
import { Menu } from '.';
import { Button } from '../button';
import { Modal } from '../modal';

type MenuMeta = Meta<typeof Menu>;
type MenuStory = StoryObj<typeof Menu>;

const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 220px;
`;

const MenuAction = styled.button`
  padding: 12px 16px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.base.white};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray2};
  }
`;

const MenuText = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;

const StoryAlignRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Basic: MenuStory = {
  args: {
    buttonLabel: 'Открыть меню',
    children: (
      <MenuBody>
        <MenuAction type="button">Пользователи</MenuAction>
        <MenuAction type="button">Пресеты</MenuAction>
        <MenuAction type="button">Модели</MenuAction>
        <MenuText>Любой контент внутри dropdown.</MenuText>
      </MenuBody>
    ),
  },
};

export const CustomTrigger: MenuStory = {
  args: {
    trigger: <Button variant="secondary">Кастомная кнопка</Button>,
    children: (
      <MenuBody>
        <MenuAction type="button">Настройки</MenuAction>
        <MenuAction type="button">Документация</MenuAction>
        <MenuAction type="button">Выход</MenuAction>
      </MenuBody>
    ),
  },
};

export const CloseOnClick: MenuStory = {
  args: {
    buttonLabel: 'Закрывать по клику',
    closeOnContentClick: true,
    children: (
      <MenuBody>
        <MenuAction type="button">Пункт 1</MenuAction>
        <MenuAction type="button">Пункт 2</MenuAction>
      </MenuBody>
    ),
  },
};

export const PositionLeft: MenuStory = {
  args: {
    position: 'left',
    buttonLabel: 'position: left',
    children: (
      <MenuBody>
        <MenuText>Левый край меню совпадает с левым краем кнопки.</MenuText>
      </MenuBody>
    ),
  },
  render: (args) => (
    <StoryAlignRight>
      <Menu {...args} />
    </StoryAlignRight>
  ),
};

export const PositionRight: MenuStory = {
  args: {
    position: 'right',
    buttonLabel: 'position: right',
    children: (
      <MenuBody>
        <MenuText>Правый край меню совпадает с правым краем кнопки.</MenuText>
      </MenuBody>
    ),
  },
  render: (args) => (
    <StoryAlignRight>
      <Menu {...args} />
    </StoryAlignRight>
  ),
};

export const PositionCenter: MenuStory = {
  args: {
    position: 'center',
    buttonLabel: 'position: center',
    children: (
      <MenuBody>
        <MenuText>Меню выровнено по центру кнопки.</MenuText>
      </MenuBody>
    ),
  },
  render: (args) => (
    <StoryAlignRight>
      <Menu {...args} />
    </StoryAlignRight>
  ),
};

export const LongContent: MenuStory = {
  args: {
    position: 'right',
    buttonLabel: 'Длинный список',
    children: (
      <MenuBody>
        {Array.from({ length: 20 }, (_, index) => (
          <MenuAction
            key={index}
            type="button"
          >
            Пункт {index + 1}
          </MenuAction>
        ))}
      </MenuBody>
    ),
  },
  render: (args) => (
    <StoryAlignRight>
      <Menu {...args} />
    </StoryAlignRight>
  ),
};

export const InsideModal: MenuStory = {
  args: {
    position: 'right',
    buttonLabel: 'Меню в модалке',
    children: (
      <MenuBody>
        <MenuAction type="button">Пункт 1</MenuAction>
        <MenuAction type="button">Пункт 2</MenuAction>
        <MenuAction type="button">Пункт 3</MenuAction>
      </MenuBody>
    ),
  },
  render: (args) => (
    <Modal
      open
      title="Модальное окно"
      onClose={() => undefined}
    >
      <StoryAlignRight>
        <Menu {...args} />
      </StoryAlignRight>
    </Modal>
  ),
};

export default {
  title: 'UI Components/Menu',
  component: Menu,
  decorators: [StoryDecorator()],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'center'],
    },
  },
} as MenuMeta;
