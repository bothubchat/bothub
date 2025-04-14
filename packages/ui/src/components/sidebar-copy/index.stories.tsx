import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Sidebar, SidebarListActions } from '.';
import { Logo } from '@/ui/components/logo';
import {
  SidebarLangDropdown,
  SidebarLangDropdownItem,
  SidebarLangDropdownList
} from './lang';
import { SidebarMenu, SidebarMenuItem } from './menu';
import {
  ChatsIcon,
  PresetsBigIcon,
  ReferalIcon,
  TariffIcon,
  BigModelsIcon,
  CoderIcon,
  OrganizationIcon,
  SimpleGearIcon
} from '@/ui/icons';
import { SidebarToggleButton } from './toggle-button';
import {
  SidebarCreateChatButton,
  SidebarAddGroupButton,
  SidebarSearchButton,
  SidebarEditButton
} from './buttons';
import {
  SidebarUser,
  SidebarUserInfoAvatar,
  SidebarUserInfoLogoutButton,
  SidebarUserInfoUpdateTariffBadge,
  SidebarUserInfoUpdateTariffBadgeText,
  SidebarUserInfoUpdateTariffButton,
  SidebarUserInfoUpdateTariffButtonText
} from './user-info';
import { SidebarGroup } from './group';

export type SidebarMeta = Meta<typeof Sidebar>;

export type SidebarStory = StoryObj<typeof Sidebar>;

const LangDropdown = () => (
  <SidebarLangDropdown lang="ru">
    <SidebarLangDropdownList>
      <SidebarLangDropdownItem>ru</SidebarLangDropdownItem>
      <SidebarLangDropdownItem>en</SidebarLangDropdownItem>
      <SidebarLangDropdownItem>es</SidebarLangDropdownItem>
      <SidebarLangDropdownItem>de</SidebarLangDropdownItem>
      <SidebarLangDropdownItem>fr</SidebarLangDropdownItem>
    </SidebarLangDropdownList>
  </SidebarLangDropdown>
);

const Menu = () => (
  <SidebarMenu>
    <SidebarMenuItem
      active
      label="Чаты"
      icon={<ChatsIcon />}
    />
    <SidebarMenuItem
      label="Пресеты"
      icon={<PresetsBigIcon />}
    />
    <SidebarMenuItem
      label="Партнерская программа"
      icon={<ReferalIcon />}
    />
    <SidebarMenuItem
      label="Цены"
      icon={<TariffIcon />}
    />
    <SidebarMenuItem
      label="Модели"
      icon={<BigModelsIcon />}
    />
    <SidebarMenuItem
      label="Для организаций"
      icon={<OrganizationIcon />}
    />
    <SidebarMenuItem
      label="Настройки"
      icon={<SimpleGearIcon />}
    />
    <SidebarMenuItem
      label="Для разработчиков"
      icon={<CoderIcon />}
    />
  </SidebarMenu>
);

const ChatsActions = () => <SidebarListActions>1 2 2</SidebarListActions>;

const Chats = ({
  loading,
  actions
}: {
  loading?: boolean;
  actions?: React.ReactNode;
}) => (
  <>
    <SidebarGroup
      skeleton={loading}
      actions={actions}
      name="Чаты"
    />
    <SidebarGroup
      skeleton={loading}
      actions={actions}
      name="Пресеты"
    />
    <SidebarGroup
      skeleton={loading}
      actions={actions}
      name="Работа"
    />
    <SidebarGroup
      skeleton={loading}
      actions={actions}
      name="Работа"
    />
    <SidebarGroup
      skeleton={loading}
      actions={actions}
      name="Работа"
    />
  </>
);

const User = () => (
  <SidebarUser
    avatar={
      <SidebarUserInfoAvatar
        src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
        alt="Артём"
        tariffPlan="FREE"
      />
    }
    name="Артём"
    caps="9 012 000 000 CAPS"
    updateTariff={
      <SidebarUserInfoUpdateTariffButton>
        <SidebarUserInfoUpdateTariffBadge>
          <SidebarUserInfoUpdateTariffBadgeText>
            ELITE
          </SidebarUserInfoUpdateTariffBadgeText>
        </SidebarUserInfoUpdateTariffBadge>
        <SidebarUserInfoUpdateTariffButtonText>
          Обновить тариф
        </SidebarUserInfoUpdateTariffButtonText>
      </SidebarUserInfoUpdateTariffButton>
    }
    logout={<SidebarUserInfoLogoutButton />}
  />
);

export const Basic: SidebarStory = {
  args: {
    section: 'chats',
    logo: <Logo />,
    lang: <LangDropdown />,
    menu: <Menu />,
    toggle: <SidebarToggleButton />,
    user: <User />,
    buttons: (
      <>
        <SidebarCreateChatButton variant="primary" />
        <SidebarAddGroupButton variant="secondary" />
        <SidebarSearchButton variant="secondary" />
        <SidebarEditButton variant="secondary" />
      </>
    ),
    children: (
      <Chats
        loading={false}
        actions={<ChatsActions />}
      />
    )
  }
};

export default {
  title: 'Components/Sidebar-Copy',
  component: Sidebar,
  decorators: [StoryDecorator({ scale: 'dashboard' })],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    user: {
      table: {
        disable: true
      }
    },
    toggle: {
      table: {
        disable: true
      }
    }
  }
} as SidebarMeta;
