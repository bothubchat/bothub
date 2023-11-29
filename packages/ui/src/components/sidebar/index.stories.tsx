import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import {
  Sidebar, 
  SidebarChat, 
  SidebarChatActions, 
  SidebarChatDeleteAction, 
  SidebarGroup,
  SidebarGroups,
  SidebarCollapse, 
  SidebarCreateChatButton, 
  SidebarToggleButton, 
  SidebarUserInfo, 
  SidebarUserInfoAvatar,
  SidebarUserInfoUpdateTariffButton,
  SidebarUserInfoFreeTariff,
  SidebarUserInfoBasicTariff,
  SidebarUserInfoPremiumTariff,
  SidebarUserInfoEliteTariff,
  SidebarConsumer
} from '.';
import { Tooltip } from '@/ui/components/tooltip';

export type SidebarMeta = Meta<typeof Sidebar>;

export type SidebarStory = StoryObj<typeof Sidebar>;

export const Basic: SidebarStory = {
  args: {
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
    createChat: (
      <SidebarCreateChatButton>
        Создать чат
      </SidebarCreateChatButton>
    ),
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
              tokens="9 012 CAPS"
              tariff={(
                <SidebarUserInfoFreeTariff />
              )}
              updateTariff={(
                <SidebarUserInfoUpdateTariffButton>
                  Обновить тариф
                </SidebarUserInfoUpdateTariffButton>
              )}
            />
          </Tooltip>
        )}
      </SidebarConsumer>
    ),
    children: (
      <SidebarCollapse label="Список чатов">
        <SidebarGroups>
          <SidebarGroup name="Вчера">
            <SidebarChat
              color="#1C64F2"
              name="Your first chat"
              numbers="36.7K"
              active
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
            <SidebarChat
              color="#941CF2"
              name="Придумать логотип"
              numbers="1.7K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
          </SidebarGroup>
          <SidebarGroup name="Предыдущие 7 дней">
            <SidebarChat
              color="#1CB2F2"
              name="Дипломная работа"
              numbers="12.7K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
            <SidebarChat
              color="#F29C1C"
              name="Реферат"
              numbers="6.9K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
          </SidebarGroup>
          <SidebarGroup name="Предыдущие 7 дней">
            <SidebarChat
              color="#1ABB34"
              name="Для клиентов"
              numbers="12.7K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
            <SidebarChat
              color="#F2DD1C"
              name="Придумай мне резюме"
              numbers="6.9K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
            <SidebarChat
              color="#941CF2"
              name="Длинное название чата Длинное название чата Длинное название чата Длинное название чата Длинное название чата"
              numbers="1.7K"
              actions={(
                <SidebarChatActions>
                  <SidebarChatDeleteAction />
                </SidebarChatActions>
              )}
            />
          </SidebarGroup>
        </SidebarGroups>
      </SidebarCollapse>
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
        tokens="9 000 000 CAPS"
        tariff={(
          <SidebarUserInfoBasicTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Обновить тариф
          </SidebarUserInfoUpdateTariffButton>
        )}
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
        tokens="2 000 000 000 000 000 CAPS"
        tariff={(
          <SidebarUserInfoPremiumTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Обновить тариф
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
        tokens="9 012 CAPS"
        tariff={(
          <SidebarUserInfoEliteTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton>
            Обновить тариф
          </SidebarUserInfoUpdateTariffButton>
        )}
      />
    )
  }
};

export const Skeleton: SidebarStory = {
  args: {
    toggle: (
      <SidebarToggleButton disabled />
    ),
    createChat: (
      <SidebarCreateChatButton disabled>
        Создать чат
      </SidebarCreateChatButton>
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
        tokens="9 012 CAPS"
        tariff={(
          <SidebarUserInfoFreeTariff />
        )}
        updateTariff={(
          <SidebarUserInfoUpdateTariffButton disabled>
            Обновить тариф
          </SidebarUserInfoUpdateTariffButton>
        )}
      />
    ),
    children: (
      <SidebarCollapse skeleton>
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
      </SidebarCollapse>
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
  title: 'UI Components/Sidebar',
  component: Sidebar,
  decorators: [ThemeStoryDecorator()],
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
    createChat: {
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
