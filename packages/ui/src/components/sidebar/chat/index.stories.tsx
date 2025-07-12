import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { SidebarChat, SidebarChatCheckbox } from '.';
import {
  SidebarDropdown,
  SidebarDropdownItem,
  SidebarDropdownList
} from '../dropdown';
import { EditIcon, Gpt35Icon, TrashIcon } from '@/ui/icons';

export type SidebarChatMeta = Meta<typeof SidebarChat>;

export type SidebarChatStory = StoryObj<typeof SidebarChat>;

export const Basic: SidebarChatStory = {
  args: {
    id: 'chat-1',
    color: '#1C64F2',
    name: 'Your first chat',
    caps: '36.7K',
    icon: <Gpt35Icon size={18} />,
    checkbox: (
      <SidebarChatCheckbox
        checked
        onValueChange={() => {}}
      />
    ),
    actions: (
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
    )
  }
};

export const WithProgress: SidebarChatStory = {
  args: {
    ...Basic.args,
    progress: {
      value: 100,
      max: 100
    }
  }
};

export default {
  title: 'Components/SidebarChat',
  component: SidebarChat,
  decorators: [StoryDecorator({ scale: 'dashboard' })]
} as SidebarChatMeta;
