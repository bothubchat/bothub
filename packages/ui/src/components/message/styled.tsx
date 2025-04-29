import { styled, css } from 'styled-components';
import { Avatar } from '@/ui/components/avatar';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { ArrowNarrowDownIcon } from '@/ui/icons/arrow-narrow-down';
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';
import { ArrowNarrowRightIcon } from '@/ui/icons/arrow-narrow-right';
import { ArrowNarrowUpIcon } from '@/ui/icons/arrow-narrow-up';
import { EditIcon } from '@/ui/icons/edit';
import { MessageTimestampPosition, MessageVariant } from './types';
import { adaptive } from '@/ui/adaptive';
import { Badge } from '@/ui/components/badge';
import { Scrollbar } from '@/ui/components/scrollbar';
import {
  MessageImageButton,
  MessageImageButtonZoneWrapper
} from './components/image/button';

export interface MessageStyledProps {
  $variant: MessageVariant;
}

export const MessageStyledWrapper = styled.div<MessageStyledProps>`
  display: flex;
  width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          justify-content: flex-start;
          flex-direction: row-reverse;
          margin-left: auto;
        `;
      case 'assistant':
        return css`
          margin-right: auto;
        `;
    }
  }}
`;

export const MessageStyledWithBottomPanel = styled.div`
  display: flex;
  width: fit-content;
  max-width: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const MessageStyled = styled.div<MessageStyledProps>`
  display: flex;
  max-width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          flex-direction: row-reverse;
        `;
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
  position: relative;
  display: grid;
  column-gap: 12px;
  max-width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          grid-template-areas: '. top .' 'actions block avatar' '. buttons .';
        `;
      case 'assistant':
        return css`
          grid-template-areas: '. top .' 'avatar block actions' '. buttons .';
        `;
    }
  }}
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

export const MessageBottom = styled.div`
  margin-top: 4px;
  grid-area: buttons;
`;

export const MessageSender = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export interface MessageNameProps {
  $color: string;
}

export const MessageName = styled(Typography).attrs({
  variant: 'body-m-regular'
})<MessageNameProps>`
  color: ${({ theme, $color }) => {
    switch ($color) {
      case 'green':
        return theme.mode === 'dark'
          ? theme.default.colors.base.white
          : theme.colors.gpt3;
      case 'purple':
        return theme.mode === 'dark'
          ? theme.default.colors.base.white
          : theme.colors.gpt4;
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
  user-select: none;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none;
  }
`;

export interface MessageBlockProps {
  $variant: MessageVariant;
  $hexColor: string;
  $skeleton: boolean;
  $hasTimestamp?: boolean;
  $timestampPosition?: MessageTimestampPosition;
}

export const MessageBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  grid-area: block;
  gap: 6px;
  position: relative;
  overflow: auto;
`;

export const MessageBlock = styled.div<MessageBlockProps>`
  position: relative;
  display: flex;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          border-bottom-right-radius: 0px;
        `;
      case 'assistant':
        return css`
          border-bottom-left-radius: 0px;
        `;
    }
  }}
  ${({ $hexColor, $variant }) =>
    $variant === 'user' && `background: ${$hexColor};`}

  ${({ $hasTimestamp, $timestampPosition, $variant }) =>
    $hasTimestamp
      ? $variant === 'user' &&
        adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            padding: ${$timestampPosition === 'right'
              ? '8px'
              : '8px 8px 5px 8px'};
          `,
          tablet: css`
            padding: ${$timestampPosition === 'right'
              ? '8px'
              : '8px 8px 5px 8px'};
          `
        })
      : $variant === 'user' &&
        adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            padding: 14px 16px;
          `,
          tablet: css`
            padding: 14px;
          `
        })}

  ${({ $timestampPosition }) =>
    $timestampPosition === 'bottom' &&
    css`
      flex-direction: column;
    `}
`;

export const MessageBlockBottomPanel = styled.div<{
  $variant: MessageVariant;
  $speechSynthesis?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $speechSynthesis, $variant }) =>
    $variant !== 'user' && $speechSynthesis && 'space-between'};
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          margin-top: 4px;
          margin-left: 0px;
        `;
      case 'assistant':
        return css`
          margin-left: 52px;
        `;
      default:
        return css``;
    }
  }}
`;

export const MessageBlockBottomPanelContent = styled.div<{
  $variant: MessageVariant;
  $speechSynthesis?: boolean;
}>`
  display: flex;
  gap: 10px;
  flex-direction: ${({ $speechSynthesis, $variant }) =>
    $variant !== 'user' && $speechSynthesis && 'row-reverse'};
  justify-content: ${({ $speechSynthesis, $variant }) =>
    $variant !== 'user' && $speechSynthesis && 'start'};
`;

export const MessageBlockTransaction = styled.div<{ $top?: boolean }>`
  ${({ $top }) =>
    $top
      ? adaptive({
          desktop: css`
            display: none;
          `,
          tablet: css`
            display: none;
          `,
          mobile: css`
            display: block;
          `
        })
      : adaptive({
          desktop: css`
            display: block;
          `,
          tablet: css`
            display: block;
          `,
          mobile: css`
            display: none;
          `
        })}
`;

export const MessageBlockScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary'
})``;

export const MessageBlockContent = styled.div<{
  $variant: MessageVariant;
  $speechSynthesis?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  grid-area: block;
  border-radius: 10px;
  padding: ${({ $variant, $speechSynthesis }) => {
    switch ($variant) {
      case 'user':
        return '8px';
      case 'assistant':
        return $speechSynthesis ? '0px' : '0px 8px 8px 0px';
    }
  }};
  max-width: 100%;
  overflow: auto;
`;

export const MessageBlockTextArea = styled.span.attrs({
  role: 'textbox',
  contentEditable: true,
  suppressContentEditableWarning: true
})`
  min-width: 10ch;
  min-height: 1ch;
  min-height: 1cap;
  width: 100%;
  max-width: 100%;
  height: auto;
  resize: none;
  overflow: clip;
  white-space: pre-wrap;
  border: none;
  outline: none;
  background-color: transparent;
  ${adaptive({
    desktop: css`
      font-size: 16px;
    `,
    tablet: css`
      font-size: 14px;
    `,
    mobile: css`
      font-size: 14px;
    `
  })}
`;

export const MessageButtonsStyled = styled.div`
  margin-left: 48px;
`;

export const MessageTransaction = styled(Typography).attrs({
  variant: 'body-m-regular'
})`
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

export const MessageAction = styled(Button).attrs({
  variant: 'text',
  iconSize: 18
})``;

export const MessageEditAction = styled(MessageAction).attrs({
  children: <EditIcon />
})``;

export const MessageImageLeftArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowLeftIcon />
})`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-start;
  }
`;

export const MessageImageRightArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowRightIcon />
})`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-end;
  }
`;

export const MessageImageTopArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowUpIcon />
})`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-start;
  }
`;

export const MessageImageBottomArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowDownIcon />
})`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-end;
  }
`;
