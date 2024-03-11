import { styled, css } from 'styled-components';
import { Avatar } from '@/ui/components/avatar';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { ArrowNarrowDownIcon } from '@/ui/icons/arrow-narrow-down';
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';
import { ArrowNarrowRightIcon } from '@/ui/icons/arrow-narrow-right';
import { ArrowNarrowUpIcon } from '@/ui/icons/arrow-narrow-up';
import { EditIcon } from '@/ui/icons/edit';
import { MessageColor, MessageVariant } from './types';
import { adaptive } from '@/ui/adaptive';
import { useMessage } from './context';
import { Badge } from '@/ui/components/badge';
import { Scrollbar } from '@/ui/components/scrollbar';
import { MessageImageButton, MessageImageButtonZoneWrapper } from './components/image/button';

export interface MessageStyledProps {
  $variant: MessageVariant;
}

export const MessageStyled = styled.div<MessageStyledProps>`
  display: flex;
  width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          justify-content: flex-end;
        `;
      case 'assistant':
        return css``;
    }
  }}
  ${() => css`
    ${MessageActions} {
      visibility: hidden;
    }
    &:hover {
      ${MessageActions} {
        visibility: visible;
      }
    }
  `}
  ${adaptive(() => ({
    variant: 'dashboard',
    touch: css`
      ${MessageActions} {
        visibility: visible !important;
      }
    `
  }))}
`;

export interface MessageContentProps {
  $variant: MessageVariant;
}

export const MessageContent = styled.div<MessageContentProps>`
  display: grid;
  column-gap: 10px;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          grid-template-areas: ". top ." "actions block avatar" ". buttons .";
        `;
      case 'assistant':
        return css`
          grid-template-areas: ". top ." "avatar block actions" ". buttons .";
        `;
    }
  }}
  ${adaptive({
    desktop: css`
      max-width: 90%;
    `,
    tablet: css`
      max-width: 95%;
    `,
    mobile: css`
      max-width: 100%;
    `
  })}
`;

export const MessageTop = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  grid-area: top;
  margin-bottom: 8px;
`;

export const MessageSender = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export interface MessageNameProps {
  $color: MessageColor;
}

export const MessageName = styled(Typography).attrs({ variant: 'body-m-regular' })<MessageNameProps>`
  color: ${({ theme, $color }) => {
    switch ($color) {
      case 'green':
        return theme.mode === 'dark' ? theme.default.colors.base.white : theme.colors.gpt3;
      case 'purple':
        return theme.mode === 'dark' ? theme.default.colors.base.white : theme.colors.gpt4;
      default:
        return theme.colors.base.white;
    }
  }};
`;

export const MessageTags = styled.div``;

export const MessageTag = styled(Badge)``;

export const MessageAvatar = styled(Avatar)`
  grid-area: avatar;
  align-self: flex-end;
`;

export interface MessageBlockProps {
  $variant: MessageVariant;
  $color: MessageColor;
  $hexColor: string;
  $skeleton: boolean;
}

export const MessageBlock = styled.div<MessageBlockProps>`
  display: flex;
  grid-area: block;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  overflow: auto;
  border-bottom-left-radius: 0px;
  background: ${({ $hexColor }) => $hexColor};
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding: 14px 16px;
    `,
    tablet: css`
      padding: 14px;
    `
  })}
`;

export const MessageBlockScrollbarWrapper = styled(Scrollbar).attrs({ variant: 'secondary' })``;

export const MessageBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  grid-area: block;
  border-radius: 10px;
`;

export const MessageTransaction = styled(Typography).attrs({ variant: 'body-m-regular' })`
  text-transform: uppercase;
  color: ${({ theme }) => {
    if (theme.mode === 'light') {
      return theme.colors.accent.primary;
    }

    return theme.colors.grayScale.gray6;
  }};
`;

export const MessageActions = styled.div`
  display: flex;
  grid-area: actions;
  gap: 10px;
  align-self: flex-end;
`;

export const MessageAction = styled(Button).attrs(() => {
  const { typing } = useMessage();

  return { 
    variant: 'text', 
    iconSize: 18,
    disabled: typing
  };
})``;

export const MessageEditAction = styled(MessageAction).attrs({ children: <EditIcon /> })``;

export const MessageImageLeftArrowButton = styled(MessageImageButton).attrs({ variant: 'primary-transparent', zone: true, children: <ArrowNarrowLeftIcon /> })`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-start;
  }
`;

export const MessageImageRightArrowButton = styled(MessageImageButton).attrs({ variant: 'primary-transparent', zone: true, children: <ArrowNarrowRightIcon /> })`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-end;
  }
`;

export const MessageImageTopArrowButton = styled(MessageImageButton).attrs({ variant: 'primary-transparent', zone: true, children: <ArrowNarrowUpIcon /> })`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-start;
  }
`;

export const MessageImageBottomArrowButton = styled(MessageImageButton).attrs({ variant: 'primary-transparent', zone: true, children: <ArrowNarrowDownIcon /> })`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-end;
  }
`;
