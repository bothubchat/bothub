import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Sidebar,
  SidebarListActions,
  SidebarDropdownItem,
  SidebarChat,
  SidebarGroup,
} from '.';
import { Logo } from '@/ui/components/logo';
import {
  SidebarLangDropdown,
  SidebarLangDropdownItem,
  SidebarLangDropdownList,
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
  SimpleGearIcon,
  Gpt35Icon,
} from '@/ui/icons';
import { SidebarToggleButton } from './toggle-button';
import {
  SidebarCreateChatButton,
  SidebarSearchButton,
  SidebarEditButton,
  SidebarAddGroupButton,
  SidebarDeleteButton,
} from './buttons';
import {
  SidebarUser,
  SidebarUserInfoAvatar,
  SidebarUserInfoLogoutButton,
  SidebarUserInfoUpdateTariffBadge,
  SidebarUserInfoUpdateTariffBadgeText,
  SidebarUserInfoUpdateTariffButton,
  SidebarUserInfoUpdateTariffButtonText,
} from './user-info';
import { Tooltip } from '../tooltip';
import { TextField } from '../text-field';
import { SidebarListChats } from './list';

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
      icon={<ChatsIcon />}
    >
      Чаты
    </SidebarMenuItem>
    <SidebarMenuItem icon={<PresetsBigIcon />}>Пресеты</SidebarMenuItem>
    <SidebarMenuItem icon={<ReferalIcon />}>
      Партнерская программа
    </SidebarMenuItem>
    <SidebarMenuItem icon={<TariffIcon />}>Тариф</SidebarMenuItem>
    <SidebarMenuItem icon={<BigModelsIcon />}>Модели</SidebarMenuItem>
    <SidebarMenuItem icon={<OrganizationIcon />}>Организации</SidebarMenuItem>
    <SidebarMenuItem icon={<SimpleGearIcon />}>Настройки</SidebarMenuItem>
    <SidebarMenuItem icon={<CoderIcon />}>Для кодеров</SidebarMenuItem>
  </SidebarMenu>
);

const ChatsActions = () => (
  <SidebarListActions>
    <SidebarDropdownItem icon={<ChatsIcon />}>
      Редактировать
    </SidebarDropdownItem>
  </SidebarListActions>
);

const Chat: React.FC<{ skeleton?: boolean }> = ({ skeleton = false }) => (
  <>
    <SidebarChat
      id="chat-1"
      actions={<ChatsActions />}
      name="ЧатЧатЧатЧатЧатЧатЧатЧатЧатЧатЧатЧат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-2"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-3"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-4"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-5"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-6"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-7"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-8"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-9"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
    <SidebarChat
      id="chat-10"
      actions={<ChatsActions />}
      name="Чат"
      icon={<Gpt35Icon />}
      skeleton={skeleton}
    />
  </>
);

const Chats = ({
  loading,
  actions,
}: {
  loading?: boolean;
  actions?: React.ReactNode;
}) => (
  <>
    <SidebarGroup
      id="group-1"
      skeleton={loading}
      actions={actions}
      name="Чаты"
    >
      <Chat skeleton />
    </SidebarGroup>
    <SidebarGroup
      id="group-2"
      skeleton={loading}
      actions={actions}
      name="Пресеты"
    >
      <Chat />
    </SidebarGroup>
    <SidebarGroup
      id="group-3"
      skeleton={loading}
      actions={actions}
      name="Чаты"
    >
      <Chat />
    </SidebarGroup>
    <SidebarGroup
      id="group-4"
      skeleton={loading}
      actions={actions}
      name="Пресеты"
    >
      <Chat />
    </SidebarGroup>
    <SidebarGroup
      id="group-5"
      loading
      skeleton={loading}
      actions={actions}
      name="Чат12222221222222222222ы"
    >
      <Chat />
    </SidebarGroup>
    <SidebarGroup
      id="group-6"
      skeleton={loading}
      actions={actions}
      name="Пресеты"
    >
      <Chat />
    </SidebarGroup>
    <SidebarListChats>
      <Chat />
    </SidebarListChats>
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
    deleteButton: <SidebarDeleteButton />,
    lang: <LangDropdown />,
    menu: <Menu />,
    search: (
      <TextField
        placeholder="Поиск"
        type="search"
      />
    ),
    toggle: <SidebarToggleButton />,
    user: <User />,
    buttons: (
      <>
        <Tooltip
          align="center"
          placement="center-right"
          label="Tooltip text"
        >
          <SidebarCreateChatButton variant="primary" />
        </Tooltip>
        <SidebarAddGroupButton variant="secondary" />
        <SidebarSearchButton variant="secondary" />
        <SidebarEditButton variant="secondary" />
      </>
    ),
    children: <Chats actions={<ChatsActions />} />,
  },
};

export default {
  title: 'Components/Sidebar-Copy',
  component: Sidebar,
  decorators: [StoryDecorator({ scale: 'dashboard' })],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    user: {
      table: {
        disable: true,
      },
    },
    toggle: {
      table: {
        disable: true,
      },
    },
  },
} as SidebarMeta;
