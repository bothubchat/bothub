import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Sidebar,
  SidebarChat,
  SidebarGroup,
  SidebarGroups,
  SidebarCreateChatButton,
  SidebarToggleButton,
  SidebarUserInfo,
  SidebarUserInfoAvatar,
  SidebarUserInfoUpdateTariffButton,
  SidebarUserInfoFreeTariff,
  SidebarUserInfoBasicTariff,
  SidebarUserInfoPremiumTariff,
  SidebarUserInfoEliteTariff,
  SidebarConsumer,
  SidebarEmpty,
  SidebarButtons,
  SidebarLogo,
  SidebarLogoLink,
  SidebarMenu,
  SidebarMenuNav,
  SidebarMenuNavLink,
  SidebarChatCheckbox,
  SidebarUserInfoLogoutButton,
  SidebarAddGroupButton,
  SidebarEditButton,
  SidebarDropdown,
  SidebarDropdownItem,
  SidebarDropdownList,
  SidebarDeleteButton,
  SidebarTextField,
  SidebarSearchButton,
} from '.';
import { Tooltip } from '@/ui/components/tooltip';
import {
  ChatsIcon,
  BookmarksBigIcon,
  PresetsBigIcon,
  ReferalIcon,
  TariffIcon,
  GearIcon,
  EditIcon,
  TrashIcon,
} from '@/ui/icons';
import { Checkbox } from '../checkbox';
import { SidebarGroupEmpty } from './group-empty';

export type SidebarMeta = Meta<typeof Sidebar>;

export type SidebarStory = StoryObj<typeof Sidebar>;

export const Basic: SidebarStory = {
  args: {
    logo: (
      <SidebarLogoLink href="#home">
        <SidebarLogo />
      </SidebarLogoLink>
    ),
    menu: (
      <SidebarMenuNav>
        <SidebarMenuNavLink
          href="#"
          icon={<ChatsIcon />}
          active
        >
          Чаты
        </SidebarMenuNavLink>
        <SidebarMenuNavLink
          href="#"
          icon={<BookmarksBigIcon />}
        >
          Закладки
        </SidebarMenuNavLink>
        <SidebarMenuNavLink
          href="#"
          icon={<PresetsBigIcon />}
        >
          Пресеты
        </SidebarMenuNavLink>
        <SidebarMenuNavLink
          href="#"
          icon={<ReferalIcon />}
        >
          Партнерская программа
        </SidebarMenuNavLink>
        <SidebarMenuNavLink
          href="#"
          icon={<TariffIcon />}
        >
          Пакеты
        </SidebarMenuNavLink>
        <SidebarMenuNavLink
          href="#"
          icon={<GearIcon />}
        >
          Для разработчиков
        </SidebarMenuNavLink>
      </SidebarMenuNav>
    ),
    toggle: (
      <SidebarConsumer>
        {({ isOpen }) => (
          <Tooltip
            label={isOpen ? 'Скрыть боковую панель' : 'Открыть боковую панель'}
            placement={isOpen ? 'top' : 'top-left'}
            disableHiddenAnimation
          >
            <SidebarToggleButton />
          </Tooltip>
        )}
      </SidebarConsumer>
    ),
    buttons: (
      <SidebarButtons>
        <SidebarCreateChatButton variant="primary" />
        <SidebarAddGroupButton variant="secondary" />
        <SidebarSearchButton variant="secondary" />
        <SidebarEditButton variant="secondary" />
      </SidebarButtons>
    ),
    search: (
      <SidebarTextField type="search" fullWidth placeholder="Поиск" />
    ),
    deleteButton: (
      <SidebarDeleteButton>
        Удалить выбранное
      </SidebarDeleteButton>),
    user: (
      <SidebarConsumer>
        {({ isOpen }) => (
          <Tooltip
            label="Профиль"
            placement="top-left"
            disabled={isOpen}
          >
            <SidebarUserInfo
              avatar={(
                <SidebarUserInfoAvatar
                  src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
                  alt="Артём"
                />
              )}
              name="Артём"
              caps="9 012 000 000 CAPS"
              tariff={(
                <SidebarUserInfoFreeTariff />
              )}
              updateTariff={(
                <SidebarUserInfoUpdateTariffButton>
                  Купить пакет
                </SidebarUserInfoUpdateTariffButton>
              )}
              logout={<SidebarUserInfoLogoutButton />}
            />
          </Tooltip>
        )}
      </SidebarConsumer>
    ),
    children: (
      <SidebarGroups>
        <SidebarGroup checkbox={<Checkbox checked />} id="chat-group-1" name="Шабажка">
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Кто прочитал, тот молодец"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
        <SidebarGroup checkbox={<Checkbox checked />} id="chat-group-1" name="Калькулятор">
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
        <SidebarGroup checkbox={<Checkbox checked />} id="chat-group-1" name="Как разблокировать дискорд">
          <SidebarGroupEmpty>Чатов нет идите отсюла</SidebarGroupEmpty>
        </SidebarGroup>
        <SidebarGroup edit checkbox={<SidebarChatCheckbox checked />} id="chat-group-1" name="Бесплатный впн">
          <SidebarChat
            edit
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
        <SidebarGroup checkbox={<Checkbox checked />} id="chat-group-1" name="Работа">
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
        <SidebarGroup
          id="chat-group-1"
          name="Работа"
          checkbox={
            <Checkbox checked />
          }
          actions={(
            <SidebarDropdown>
              <SidebarDropdownList>
                <SidebarDropdownItem startIcon={<EditIcon />}>
                  Редактировать
                </SidebarDropdownItem>
                <SidebarDropdownItem startIcon={<TrashIcon />}>
                  Удалить
                </SidebarDropdownItem>
              </SidebarDropdownList>
            </SidebarDropdown>
          )}
        >
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
        <SidebarGroup isDefault checkbox={<Checkbox checked />} id="chat-group-1" name="Работа">
          <SidebarChat
            id="chat-1"
            isDefault
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            isDefault
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
          <SidebarChat
            id="chat-1"
            color="#1C64F2"
            name="Your first chat"
            caps="36.7K"
            checkbox={(
              <SidebarChatCheckbox
                checked
                onValueChange={() => { }}
              />
            )}
            actions={(
              <SidebarDropdown>
                <SidebarDropdownList>
                  <SidebarDropdownItem startIcon={<EditIcon />}>
                    Редактировать
                  </SidebarDropdownItem>
                  <SidebarDropdownItem startIcon={<TrashIcon />}>
                    Удалить
                  </SidebarDropdownItem>
                </SidebarDropdownList>
              </SidebarDropdown>
            )}
          />
        </SidebarGroup>
      </SidebarGroups>
    )
  }
};

export const BasicTariff: SidebarStory = {
  args: {
    ...Basic.args,
    user: (
      <SidebarUserInfo
        avatar={(
          <SidebarUserInfoAvatar
            src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
            alt="Артём"
          />
        )}
        name="Артём"
        caps="9 000 000 CAPS"
        tariff={(
          <SidebarUserInfoBasicTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Купить пакет
          </SidebarUserInfoUpdateTariffButton>
        )}
        logout={<SidebarUserInfoLogoutButton />}
      />
    )
  }
};

export const PremiumTariff: SidebarStory = {
  args: {
    ...Basic.args,
    user: (
      <SidebarUserInfo
        avatar={(
          <SidebarUserInfoAvatar
            src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
            alt="Артём"
          />
        )}
        name="Артём"
        caps="2 000 000 000 000 000 CAPS"
        tariff={(
          <SidebarUserInfoPremiumTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Купить пакет
          </SidebarUserInfoUpdateTariffButton>
        )}
      />
    )
  }
};

export const EliteTariff: SidebarStory = {
  args: {
    ...Basic.args,
    user: (
      <SidebarUserInfo
        avatar={(
          <SidebarUserInfoAvatar
            src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
            alt="Артём"
          />
        )}
        name="Артём"
        caps="9 012 CAPS"
        tariff={(
          <SidebarUserInfoEliteTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Купить пакет
          </SidebarUserInfoUpdateTariffButton>
        )}
        logout={<SidebarUserInfoLogoutButton />}
      />
    )
  }
};

export const Empty: SidebarStory = {
  args: {
    ...EliteTariff.args,
    children: (
      <SidebarEmpty>
        На данный момент у вас нет чатов
      </SidebarEmpty>
    )
  }
};

export const Skeleton: SidebarStory = {
  args: {
    logo: <SidebarLogo />,
    menu: <SidebarMenu disabled />,
    toggle: (
      <SidebarToggleButton disabled />
    ),
    buttons: (
      <SidebarButtons />
    ),
    user: (
      <SidebarUserInfo
        avatar={(
          <SidebarUserInfoAvatar
            src="https://sun9-10.userapi.com/impg/Cj0IN0wgoLVrUC7TLK6OOf7UK122Hs4PrZwjjQ/VcFb3Xn1j1A.jpg?size=640x640&quality=95&sign=8311a1a31d98004967ebaba8d62b2710&type=album"
            alt="Артём"
          />
        )}
        name="Артём"
        caps="9 012 CAPS"
        tariff={(
          <SidebarUserInfoFreeTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton disabled>
            Купить пакет
          </SidebarUserInfoUpdateTariffButton>
        )}
        logout={<SidebarUserInfoLogoutButton />}
      />
    ),
    children: (
      <SidebarGroups>
        <SidebarGroup skeleton>
          <SidebarChat skeleton />
          <SidebarChat skeleton />
        </SidebarGroup>
        <SidebarGroup skeleton>
          <SidebarChat skeleton />
          <SidebarChat skeleton />
        </SidebarGroup>
        <SidebarGroup skeleton>
          <SidebarChat skeleton />
          <SidebarChat skeleton />
        </SidebarGroup>
      </SidebarGroups>
    )
  }
};

export const SkeletonClosed: SidebarStory = {
  args: {
    ...Skeleton.args,
    open: false
  }
};

export default {
  title: 'Components/Sidebar',
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
