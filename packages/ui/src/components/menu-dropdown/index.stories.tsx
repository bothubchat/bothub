import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { MenuDropdown } from '.';
import { MenuDropdownNav } from './styled';
import { MenuDropdownNavLink } from './nav/link';
import { MenuIcon } from '@/ui/icons/menu';

export type MenuDropDownMeta = Meta<typeof MenuDropdown>;
export type MenuDropDownStory = StoryObj<typeof MenuDropdown>;

export const Basic: MenuDropDownStory = {
  args: {
    children:
  <MenuDropdownNav>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Пользователи</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Пресеты</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Категории пресетов</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Рефералка (шаблоны)</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Рефералка (активные)</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Выводы</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Планы</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Модели</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Организации</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>Статистика</MenuDropdownNavLink>
    <MenuDropdownNavLink icon={<MenuIcon size={28} />}>MidJourney</MenuDropdownNavLink>
  </MenuDropdownNav>
  }
};

export default {
  title: 'UI Components/MenuDropDown',
  component: MenuDropdown,
  decorators: [StoryDecorator()]
} as MenuDropDownMeta;
