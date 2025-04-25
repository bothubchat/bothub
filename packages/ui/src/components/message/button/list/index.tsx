import React from 'react';
import {
  MessageButtonsContent,
  MessageButtonsScrollbarWrapper,
  MessageButtonsStyled
} from './styled';
import {
  ScrollbarShadow,
  ScrollbarShadowProps
} from '@/ui/components/scrollbar';
import { useTheme } from '@/ui/theme';

export interface MessageButtonsProps extends React.ComponentProps<'div'> {
  scrollShadows?: ScrollbarShadowProps;
}

export const MessageButtons: React.FC<MessageButtonsProps> = ({
  scrollShadows,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <MessageButtonsStyled {...props}>
      <MessageButtonsScrollbarWrapper
        scrollShadows={{
          color: theme.colors.grayScale.gray4,
          left: <ScrollbarShadow side="left" />,
          right: <ScrollbarShadow side="right" />,
          ...scrollShadows
        }}
      >
        <MessageButtonsContent>{children}</MessageButtonsContent>
      </MessageButtonsScrollbarWrapper>
    </MessageButtonsStyled>
  );
};
