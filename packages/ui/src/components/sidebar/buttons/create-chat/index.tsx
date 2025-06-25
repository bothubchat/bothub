import React, { useMemo } from 'react';

import { AddChatIcon } from '@/ui/icons/add-chat';

import { Button, ButtonProps } from '@/ui/components/button';
import { useTheme } from '@/ui/theme';

export type SidebarCreateChatButtonProps = ButtonProps;

export const SidebarCreateChatButton: React.FC<
  SidebarCreateChatButtonProps
> = ({ ...props }) => {
  const theme = useTheme();

  const stroke = useMemo(() => {
    switch (theme.mode) {
      case 'dark':
        return theme.bright ? theme.colors.base.black : theme.colors.base.white;
      case 'light':
        return theme.bright
          ? theme.default.colors.base.black
          : theme.default.colors.base.white;
    }
  }, [theme.mode, theme.bright]);

  return (
    <Button
      {...props}
      iconFill={stroke}
    >
      <AddChatIcon />
    </Button>
  );
};
