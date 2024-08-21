import type { Meta, StoryObj } from '@storybook/react';
import {
  Header, 
  HeaderUserInfo, 
  HeaderUserInfoAvatar, 
  HeaderUserInfoItem, 
  HeaderUserInfoList, 
  HeaderLogoLink, 
  HeaderNav, 
  HeaderNavDropdown, 
  HeaderNavDropdownItem, 
  HeaderNavDropdownList, 
  HeaderNavLink, 
  HeaderUser, 
  HeaderUserButton,
  HeaderThemeSwitcher
} from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Logo } from '@/ui/components/logo';
import { HeaderLangDropdown, HeaderLangDropdownItem, HeaderLangDropdownList } from './lang-dropdown';
import {
  BookmarksBigIcon,
  BothubAggIcon, 
  BusinessColoredIcon, 
  ChatsIcon, 
  CoderIcon, 
  DashboardIcon, 
  LogoutIcon, 
  PresetsBigIcon, 
  ReferalIcon, 
  SettingsIcon, 
  TariffIcon, 
  TgColoredIcon, 
  UserProfileIcon 
} from '@/ui/icons';

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
    ...Basic.args,
    user: (
      <HeaderUser>
        <HeaderUserInfo 
          avatar={<HeaderUserInfoAvatar src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album" />}
          name="Артём"
          tokens="2 023 CAPS"
        >
          <HeaderUserInfoList>
            <HeaderUserInfoItem icon={<DashboardIcon />}>
              Дашборд
            </HeaderUserInfoItem>
            <HeaderUserInfoItem icon={<UserProfileIcon />}>
              Профиль
            </HeaderUserInfoItem>
            <HeaderUserInfoItem icon={<SettingsIcon />}>
              Настройки
            </HeaderUserInfoItem>
            <HeaderUserInfoItem icon={<LogoutIcon />}>
              Выйти
            </HeaderUserInfoItem>
          </HeaderUserInfoList>
        </HeaderUserInfo>
      </HeaderUser>
    )
  }
};

export const Dashboard: HeaderStory = {
  args: {
    ...Authorized.args,
    variant: 'dashboard',
    nav: (
      <HeaderNav>
        <HeaderNavLink icon={<ChatsIcon />} href="#">Чаты</HeaderNavLink>
        <HeaderNavLink icon={<BookmarksBigIcon />} href="#">Закладки</HeaderNavLink>
        <HeaderNavLink icon={<PresetsBigIcon />} href="#">Пресеты</HeaderNavLink>
        <HeaderNavLink icon={<ReferalIcon />} href="#">Партнерская программа</HeaderNavLink>
        <HeaderNavLink icon={<TariffIcon />} href="#">Пакеты</HeaderNavLink>
        <HeaderNavLink icon={<CoderIcon />} href="#">Для разработчиков</HeaderNavLink>
      </HeaderNav>
    ),
    themeSwitcher: (
      <HeaderThemeSwitcher />
    )
  }
};

export const AdminDashboard: HeaderStory = {
  args: {
    ...Authorized.args,
    variant: 'dashboard',
    $isAdmin: true,
    nav: (
      <HeaderNav>
        <HeaderNavLink icon={<ChatsIcon />} href="#">Чаты</HeaderNavLink>
        <HeaderNavLink icon={<BookmarksBigIcon />} href="#">Закладки</HeaderNavLink>
        <HeaderNavLink icon={<PresetsBigIcon />} href="#">Пресеты</HeaderNavLink>
        <HeaderNavLink icon={<ReferalIcon />} href="#">Партнерская программа</HeaderNavLink>
        <HeaderNavLink icon={<TariffIcon />} href="#">Пакеты</HeaderNavLink>
        <HeaderNavLink icon={<CoderIcon />} href="#">Для разработчиков</HeaderNavLink>
      </HeaderNav>
    ),
  }
};

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [StoryDecorator()],
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    logo: {
      table: {
        disable: true
      }
    },
    nav: {
      table: {
        disable: true
      }
    },
    lang: {
      table: {
        disable: true
      }
    },
    user: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    }
  }
} as HeaderMeta;
