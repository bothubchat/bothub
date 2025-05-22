import React from 'react';

import { AddChatIcon } from '@/ui/icons/add-chat';

import { Button, ButtonProps } from '@/ui/components/button';
import { useTheme } from '@/ui/theme';

export type SidebarCreateChatButtonProps = ButtonProps;

export const SidebarCreateChatButton: React.FC<SidebarCreateChatButtonProps> =
  React.memo(({ ...props }) => {
    const theme = useTheme();
    return (
      <Button {...props}>
        <AddChatIcon
          stroke={
            theme.bright && theme.mode === 'light'
              ? theme.default.colors.base.black
              : theme.default.colors.base.white
          }
        />
      </Button>
    );
  });
