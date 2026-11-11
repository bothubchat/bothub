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
  MessageImageButtonZoneWrapper,
} from './components/image/button';
import { themeVar } from '@/ui/theme';

export interface MessageStyledProps {
  $variant: MessageVariant;
}

export interface MessageStyledWrapperProps extends MessageStyledProps {
  $forkSelected?: boolean;
}

export const MessageStyledWrapper = styled.div<MessageStyledWrapperProps>`
  display: flex;
  align-items: flex-start;
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
  ${({ theme, $forkSelected }) =>
    $forkSelected &&
    css`
      outline: 1.5px dashed ${themeVar(theme, 'tokens.messageActionIcon')};
      outline-offset: 3px;
      border-radius: 10px;
    `}
  &:hover [data-message-reveal],
  &:focus-within [data-message-reveal] {
    opacity: 1;
  }
`;

// Ответ занимает колонку чата целиком, пузырь пользователя — по содержимому
const USER_MAX_WIDTH = '82%';
const USER_MAX_WIDTH_MOBILE = '86%';

const AVATAR_SIZE = 30;
const AVATAR_SIZE_MOBILE = 24;
const AVATAR_GAP = 12;
const AVATAR_GAP_MOBILE = 8;

// Строка действий под пузырём пользователя почти не занимает места в потоке:
// её видно по наведению, и она встаёт в промежуток до следующего сообщения
const USER_PANEL_HEIGHT = 28;
const USER_PANEL_IN_FLOW = 6;

export const MessageStyledWithBottomPanel = styled.div<
  Partial<MessageStyledProps>
>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ theme, $variant }) =>
    $variant === 'assistant'
      ? css`
          width: 100%;
          min-width: 0;
        `
      : css`
          width: fit-content;
          max-width: ${$variant === 'user' ? USER_MAX_WIDTH : '100%'};
          @media (max-width: ${theme.mobile.maxWidth}) {
            max-width: ${$variant === 'user' ? USER_MAX_WIDTH_MOBILE : '100%'};
          }
        `}
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
      case 'assistant':
        return css`
          width: 100%;
        `;
    }
  }}
`;

export interface MessageContentProps {
  $variant: MessageVariant;
}

/**
 * Ответ: значок модели слева сверху, справа от него имя, текст и действия.
 * На телефоне значок стоит в строке с именем, текст идёт во всю ширину.
 * Сообщение пользователя — пузырь без аватара, прижатый вправо
 */
export const MessageContent = styled.div<MessageContentProps>`
  position: relative;
  display: grid;
  max-width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          grid-template-columns: minmax(0, 1fr);
          grid-template-areas: 'top' 'files' 'block' 'buttons';
          justify-items: end;
        `;
      case 'assistant':
        return css`
          width: 100%;
          grid-template-columns: auto minmax(0, 1fr);
          grid-template-areas:
            'avatar top'
            'avatar files'
            'avatar block'
            'avatar buttons';
          column-gap: ${AVATAR_GAP}px;
        `;
    }
  }}
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    ${({ $variant }) =>
      $variant === 'assistant' &&
      css`
        grid-template-areas:
          'avatar top'
          'files files'
          'block block'
          'buttons buttons';
        column-gap: ${AVATAR_GAP_MOBILE}px;
      `}
  }
`;

export const MessageTop = styled.div<Partial<MessageStyledProps>>`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  grid-area: top;
  ${({ theme, $variant }) =>
    $variant === 'user'
      ? css`
          justify-content: flex-end;
          margin-bottom: 6px;
        `
      : css`
          justify-content: space-between;
          min-height: ${AVATAR_SIZE}px;
          margin-bottom: 10px;
          @media (max-width: ${theme.mobile.maxWidth}) {
            min-height: ${AVATAR_SIZE_MOBILE}px;
          }
        `}
`;

export const MessageSender = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
`;

export interface MessageNameProps {
  $color: string;
  $variant?: MessageVariant;
}

export const MessageName = styled(Typography).attrs({
  variant: 'body-m-regular',
})<MessageNameProps>`
  font-size: 13px;
  line-height: 18px;
  font-weight: ${({ $variant }) => ($variant === 'user' ? 500 : 600)};
  color: ${({ theme, $color, $variant }) => {
    switch ($color) {
      case 'green':
        return themeVar(theme, 'tokens.messageAccentGreenInverse');
      case 'purple':
        return themeVar(theme, 'tokens.messageAccentPurpleInverse');
      default:
        // Имя автора над пузырём в общем чате — подпись, а не заголовок
        return $variant === 'user'
          ? themeVar(theme, 'tokens.textSecondary')
          : themeVar(theme, 'tokens.textStrong');
    }
  }};
`;

export const MessageTags = styled.div``;

export const MessageTag = styled(Badge)``;

export interface MessageAvatarWrapperProps {
  $variant: MessageVariant;
  /** Без имени на телефоне значку не с чем стоять в строке */
  $hasName?: boolean;
}

export const MessageAvatar = styled(Avatar).attrs({ size: AVATAR_SIZE })`
  border-radius: 8px;
`;

export const MessageAvatarWrapper = styled.div<MessageAvatarWrapperProps>`
  grid-area: avatar;
  align-self: start;
  display: ${({ $variant }) => ($variant === 'user' ? 'none' : 'flex')};
  user-select: none;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    ${({ $hasName }) =>
      !$hasName &&
      css`
        display: none;
      `}
    /* Значок рисуется в полном размере и уменьшается целиком: у него могут
    быть свои вложенные части */
    width: ${AVATAR_SIZE_MOBILE}px;
    height: ${AVATAR_SIZE_MOBILE}px;
    ${MessageAvatar} {
      transform: scale(${AVATAR_SIZE_MOBILE / AVATAR_SIZE});
      transform-origin: top left;
    }
  }
`;

/**
 * Вложения сообщения — карточки над его текстом: у пользователя над
 * пузырём и у того же края, у ответа под именем
 */
export const MessageAttachments = styled.div<MessageStyledProps>`
  grid-area: files;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
  ${({ $variant }) =>
    $variant === 'user'
      ? css`
          align-items: flex-end;
          margin-bottom: 6px;
        `
      : css`
          align-items: flex-start;
          margin-bottom: 10px;
        `}
`;

export interface MessageBlockProps {
  $variant: MessageVariant;
  $hexColor: string;
  $skeleton: boolean;
  $hasTimestamp?: boolean;
  $timestampPosition?: MessageTimestampPosition;
}

export const MessageBlockWrapper = styled.div`
  grid-area: block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  position: relative;
  max-width: 100%;
  overflow: auto;
`;

export const MessageBlock = styled.div<MessageBlockProps>`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  ${({ $variant, $hexColor }) =>
    $variant === 'user' &&
    css`
      padding: 10px 14px;
      border-radius: 16px 16px 4px 16px;
      background: ${$hexColor};
      /* Сообщение из одних вложений: пустой пузырь под ними не нужен */
      &:not(:has([data-message-content] > *)) {
        display: none;
      }
    `}
`;

export interface MessageBlockBottomPanelProps {
  $variant: MessageVariant;
  /** Под пузырём есть кнопки: строке действий нельзя на них наезжать */
  $inFlow?: boolean;
}

const PANEL_GAP = 8;
// Кнопки шире значков: их поле выходит за левый край текста ответа
const PANEL_OUTDENT = 8;

/**
 * Строка под сообщением: действия, версии и стоимость одним блоком, время —
 * у дальнего края. В одну строку: что не поместилось, уходит в меню «ещё»
 */
export const MessageBlockBottomPanel = styled.div<MessageBlockBottomPanelProps>`
  grid-area: buttons;
  display: flex;
  align-items: center;
  column-gap: ${PANEL_GAP}px;
  min-width: 0;
  max-width: 100%;
  &:empty {
    display: none;
  }
  ${({ $variant, $inFlow }) =>
    $variant === 'user'
      ? css`
          justify-content: flex-end;
          min-height: ${USER_PANEL_HEIGHT}px;
          margin-top: 2px;
          @media (hover: hover) and (pointer: fine) {
            ${!$inFlow &&
            css`
              margin-bottom: ${USER_PANEL_IN_FLOW - USER_PANEL_HEIGHT}px;
            `}
          }
        `
      : css`
          margin-top: 10px;
          min-height: 32px;
          margin-left: -${PANEL_OUTDENT}px;
          max-width: calc(100% + ${PANEL_OUTDENT}px);
        `}
`;

/** Время сообщения: в строке действий, у её дальнего края */
export const MessageBlockMeta = styled.div<MessageStyledProps>`
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
  font-size: 12px;
  white-space: nowrap;
  &:empty {
    display: none;
  }
  ${({ $variant }) =>
    $variant === 'assistant' &&
    css`
      order: 2;
      margin-left: auto;
      padding-left: 8px;
    `}
`;

/**
 * Невидимый распор в строке действий. Просит место под действия, которые не
 * поместились и ушли в меню: по его ширине видно, сколько их можно вернуть.
 * Стоит там, где в строке и так пусто: у ответа перед временем, под пузырём
 * пользователя — в начале строки
 */
export const MessageActionsReserve = styled.div<MessageStyledProps>`
  flex: 0 1 auto;
  min-width: 0;
  height: 0;
  pointer-events: none;
  /* Сам распор зазора в строку не добавляет */
  ${({ $variant }) =>
    $variant === 'user'
      ? css`
          order: -1;
          margin-right: -${PANEL_GAP}px;
        `
      : css`
          order: 1;
          margin-left: -${PANEL_GAP}px;
        `}
`;

/**
 * Что под пузырём пользователя видно только по наведению или с клавиатуры.
 * На сенсорном экране наведения нет — там это видно всегда
 */
export const messageRevealOnHover = css`
  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
    transition: opacity 120ms ease-out;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;

/** Стоимость сообщения: сразу за действиями, одним блоком с ними */
export const MessageBlockTransaction = styled.div<Partial<MessageStyledProps>>`
  flex: none;
  /* Как у времени: подпись стоит по центру строки, а не на базовой линии */
  display: flex;
  align-items: center;
  white-space: nowrap;
  &:empty {
    display: none;
  }
  ${({ $variant }) => $variant === 'user' && messageRevealOnHover}
`;

export const MessageBlockScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
})``;

export const MessageBlockContent = styled.div<{
  $variant: MessageVariant;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  grid-area: block;
  max-width: 100%;
`;

export const MessageBlockTextArea = styled.span.attrs({
  role: 'textbox',

  contentEditable: true,
  suppressContentEditableWarning: true,
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
    `,
  })}
`;

/** Кнопки под ответом стоят под его текстом, а не под значком модели */
export const MessageButtonsStyled = styled.div<Partial<MessageStyledProps>>`
  ${({ theme, $variant }) =>
    $variant !== 'user' &&
    css`
      margin-left: ${AVATAR_SIZE + AVATAR_GAP}px;
      @media (max-width: ${theme.mobile.maxWidth}) {
        margin-left: 0;
      }
    `}
`;

export const MessageTransaction = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
`;

export const MessageAction = styled(Button).attrs({
  variant: 'text',
  iconSize: 18,
})``;

export const MessageEditAction = styled(MessageAction).attrs({
  children: <EditIcon />,
})``;

export const MessageImageLeftArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowLeftIcon />,
})`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-start;
  }
`;

export const MessageImageRightArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowRightIcon />,
})`
  ${MessageImageButtonZoneWrapper} {
    justify-content: flex-end;
  }
`;

export const MessageImageTopArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowUpIcon />,
})`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-start;
  }
`;

export const MessageImageBottomArrowButton = styled(MessageImageButton).attrs({
  variant: 'primary-transparent',
  zone: true,
  children: <ArrowNarrowDownIcon />,
})`
  ${MessageImageButtonZoneWrapper} {
    align-items: flex-end;
  }
`;
