import type { Meta, StoryObj } from '@storybook/react';
import {
  Header, HeaderLogoLink, HeaderNav, HeaderNavLink, HeaderUser 
} from '.';
import { ThemeStoryDecorator } from '@/theme/story-decorator';
import { Logo } from '../logo';
import { HeaderLangDropdown, HeaderLangDropdownItem, HeaderLangDropdownList } from './lang-dropdown';
import { Button } from '../button';

export type HeaderMeta = Meta<typeof Header>;

export type HeaderStory = StoryObj<typeof Header>;

export const Basic: HeaderStory = {
  args: {
    logo: (
      <HeaderLogoLink href="#home">
        <Logo />
      </HeaderLogoLink>
    ),
    nav: (
      <HeaderNav>
        <HeaderNavLink href="#">Главная</HeaderNavLink>
        <HeaderNavLink href="#">Тарифы</HeaderNavLink>
        <HeaderNavLink href="#">Контакты</HeaderNavLink>
        <HeaderNavLink href="#">Наши возможности</HeaderNavLink>
        <HeaderNavLink href="#">О Нас</HeaderNavLink>
        <HeaderNavLink href="#">Документация</HeaderNavLink>
      </HeaderNav>
    ),
    lang: (
      <HeaderLangDropdown lang="ru">
        <HeaderLangDropdownList>
          <HeaderLangDropdownItem>ru</HeaderLangDropdownItem>
          <HeaderLangDropdownItem>en</HeaderLangDropdownItem>
          <HeaderLangDropdownItem>es</HeaderLangDropdownItem>
          <HeaderLangDropdownItem>de</HeaderLangDropdownItem>
        </HeaderLangDropdownList>
      </HeaderLangDropdown>
    ),
    user: (
      <HeaderUser>
        <Button>Авторизация</Button>
      </HeaderUser>
    )
  }
};

export default {
  title: 'Header',
  component: Header,
  decorators: [ThemeStoryDecorator()]
} as HeaderMeta;
