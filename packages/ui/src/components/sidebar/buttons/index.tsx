import React from 'react';
import { SidebarButtonsStyled, SidebarButtonsStyledProps } from './styled';
import { useSidebar } from '../context';

export type SidebarCreateChatButtonProps = Omit<
  React.ComponentProps<typeof SidebarButtonsStyled>,
  keyof SidebarButtonsStyledProps
>;

export const SidebarButtons: React.FC<SidebarCreateChatButtonProps> = ({
  ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarButtonsStyled
      $open={isOpen}
      {...props}
    />
  );
};

export * from './styled';
