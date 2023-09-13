import type { Meta, StoryObj } from '@storybook/react';
import {
  Header, 
  HeaderAuthUser, 
  HeaderAuthUserAvatar, 
  HeaderAuthUserItem, 
  HeaderAuthUserList, 
  HeaderLogoLink, 
  HeaderNav, 
  HeaderNavDropdown, 
  HeaderNavDropdownItem, 
  HeaderNavDropdownList, 
  HeaderNavLink, 
  HeaderUser, 
  HeaderUserButton
} from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';
import { Logo } from '../logo';
import { HeaderLangDropdown, HeaderLangDropdownItem, HeaderLangDropdownList } from './lang-dropdown';
import {
  BothubAggIcon, BusinessColoredIcon, DashboardIcon, LogoutIcon, TgColoredIcon, UserProfileIcon 
} from '../icons';

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
        <HeaderNavDropdown label="Продукты">
          <HeaderNavDropdownList>
            <HeaderNavDropdownItem 
              icon={<BothubAggIcon />}
              title="Агрегатор нейросетей BotHub"
              text="ChatGPT на базе 3.5 и 4.0 версии OpenAI"
            />
            <HeaderNavDropdownItem
              icon={<TgColoredIcon />}
              title="Telegram бот"
              text="Удобный бот в Telegram который всегда под рукой"
            />
            <HeaderNavDropdownItem
              icon={<BusinessColoredIcon />}
              title="Бизнес бот"
              text="ChatGPT для эффективного решения бизнес задач"
            />
          </HeaderNavDropdownList>
        </HeaderNavDropdown>
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
        <HeaderUserButton>Авторизация</HeaderUserButton>
      </HeaderUser>
    )
  }
};

export const Authorized: HeaderStory = {
  args: {
    logo: (
      <HeaderLogoLink href="#home">
        <Logo />
      </HeaderLogoLink>
    ),
    nav: (
      <HeaderNav>
        <HeaderNavLink href="#">Главная</HeaderNavLink>
        <HeaderNavDropdown label="Продукты">
          <HeaderNavDropdownList>
            <HeaderNavDropdownItem 
              icon={<BothubAggIcon />}
              title="Агрегатор нейросетей BotHub"
              text="ChatGPT на базе 3.5 и 4.0 версии OpenAI"
            />
            <HeaderNavDropdownItem
              icon={<TgColoredIcon />}
              title="Telegram бот"
              text="Удобный бот в Telegram который всегда под рукой"
            />
            <HeaderNavDropdownItem
              icon={<BusinessColoredIcon />}
              title="Бизнес бот"
              text="ChatGPT для эффективного решения бизнес задач"
            />
          </HeaderNavDropdownList>
        </HeaderNavDropdown>
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
        <HeaderAuthUser 
          avatar={<HeaderAuthUserAvatar src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album" />}
          name="Артём"
          tokens="2 023 TKN"
        >
          <HeaderAuthUserList>
            <HeaderAuthUserItem icon={<DashboardIcon />}>
              Дашборд
            </HeaderAuthUserItem>
            <HeaderAuthUserItem icon={<UserProfileIcon />}>
              Профиль
            </HeaderAuthUserItem>
            <HeaderAuthUserItem icon={<LogoutIcon />}>
              Выйти
            </HeaderAuthUserItem>
          </HeaderAuthUserList>
        </HeaderAuthUser>
      </HeaderUser>
    )
  }
};

export default {
  title: 'UI Components/Header',
  component: Header,
  decorators: [ThemeStoryDecorator()]
} as HeaderMeta;
