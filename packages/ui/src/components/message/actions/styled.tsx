import { animated } from '@react-spring/web';
import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '../types';
import { messageRevealOnHover } from '../styled';
import { colorToRgba } from '@/ui/utils';
import { themeVar } from '@/ui/theme';

const BUTTON_SIZE = 32;
// Под пузырём пользователя ряд ниже: он стоит в промежутке между сообщениями
const BUTTON_SIZE_COMPACT = 28;
// На телефоне под пальцем нужна цель покрупнее
const BUTTON_SIZE_MOBILE = 40;
const MENU_GAP = 4;
const BUTTONS_GAP = 2;

const mobileSize = (theme: { mobile: { maxWidth: string } }) => css`
  @media (max-width: ${theme.mobile.maxWidth}) {
    min-width: ${BUTTON_SIZE_MOBILE}px;
  }
`;

/**
 * Ряд действий с кнопкой «ещё». Сжимается, когда строке тесно: по этому
 * видно, что часть действий пора убрать в меню. Уже одной кнопки не бывает
 */
export const MessageActionsStyled = styled.div<{
  $variant?: MessageVariant;
  $color?: string;
}>`
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  gap: ${BUTTONS_GAP}px;
  min-width: ${({ $variant }) =>
    $variant === 'user' ? BUTTON_SIZE_COMPACT : BUTTON_SIZE}px;
  color: ${({ theme, $color }) =>
    $color ?? themeVar(theme, 'tokens.textSecondary')};
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  ${({ theme, $variant }) => $variant !== 'user' && mobileSize(theme)}
  ${({ $variant }) => $variant === 'user' && messageRevealOnHover}
`;

/** Сами действия, без кнопки «ещё» */
export const MessageActionsList = styled.div`
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  gap: ${BUTTONS_GAP}px;
  min-width: 0;
  /* Пока ряд не пересчитан, лишняя кнопка обрезается, а не наезжает на соседей */
  overflow: hidden;
  &:empty {
    display: none;
  }
`;

export const MessageActionsMenuStyled = styled.div`
  flex: none;
  position: relative;
  display: flex;
`;

// Меню открывается от своей кнопки: у ответа вправо, под пузырём — влево
const getModalStylesX = (variant?: MessageVariant, inverted?: boolean) => {
  const toRight = variant === 'assistant' ? !inverted : !!inverted;

  return toRight
    ? css`
        left: 0;
      `
    : css`
        right: 0;
      `;
};

export const MessageActionsMenuModal = styled(animated.div)<{
  $variant?: MessageVariant;
  $invertedX?: boolean;
  $invertedY?: boolean;
}>`
  position: absolute;
  ${({ $invertedY }) =>
    !$invertedY
      ? css`
          top: calc(100% + ${MENU_GAP}px);
        `
      : css`
          bottom: calc(100% + ${MENU_GAP}px);
        `}
  ${({ $variant, $invertedX }) => getModalStylesX($variant, $invertedX)}
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: max-content;
  max-width: 280px;
  padding: 4px;
  max-height: min(320px, calc(100vh - 32px));
  overflow-y: auto;
  border-radius: 10px;
  background-color: ${({ theme }) => themeVar(theme, 'tokens.surfaceRaised')};
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  box-shadow: 0 16px 40px
    ${({ theme }) => colorToRgba(theme.default.colors.base.black, 0.45)};
  color: ${({ theme }) => themeVar(theme, 'tokens.textStrong')};
  z-index: 10;
`;

export interface MessageActionsMenuModalOptionProps {
  /** Нажатое состояние действия, ушедшего в меню: поставленная оценка */
  $active?: boolean;
}

export const MessageActionsMenuModalOption = styled.button<MessageActionsMenuModalOptionProps>`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 0 10px 0 8px;
  border-radius: 7px;
  cursor: pointer;
  ${({ theme, $active }) =>
    $active &&
    css`
      && svg {
        color: ${themeVar(theme, 'colors.accent.primaryLight')};
      }
    `}
  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ theme }) => themeVar(theme, 'tokens.hoverOverlay')};
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    min-height: 44px;
  }
`;

/** Между действиями, ушедшими в меню, и его собственными пунктами */
export const MessageActionsMenuDivider = styled.span`
  flex: none;
  height: 1px;
  margin: 3px 6px;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
`;

export interface MessageActionsButtonProps {
  /** Нажатое состояние: поставленная оценка, выбранное сообщение */
  $active?: boolean;
  $compact?: boolean;
}

/** Кнопка действия из макета: значок на прозрачном поле со скруглением */
export const MessageActionsButton = styled.button<MessageActionsButtonProps>`
  all: unset;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $compact }) => ($compact ? BUTTON_SIZE_COMPACT : BUTTON_SIZE)}px;
  height: ${({ $compact }) => ($compact ? BUTTON_SIZE_COMPACT : BUTTON_SIZE)}px;
  border-radius: 8px;
  color: ${({ theme, $active }) =>
    $active ? themeVar(theme, 'colors.accent.primaryLight') : 'inherit'};
  cursor: pointer;
  transition:
    background-color 120ms ease-out,
    color 120ms ease-out;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => themeVar(theme, 'tokens.hoverOverlay')};
    ${({ theme, $active }) =>
      !$active &&
      css`
        color: ${themeVar(theme, 'tokens.textStrong')};
      `}
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => themeVar(theme, 'tokens.borderFocus')};
    outline-offset: -2px;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  ${({ theme, $compact }) =>
    !$compact &&
    css`
      @media (max-width: ${theme.mobile.maxWidth}) {
        width: ${BUTTON_SIZE_MOBILE}px;
        height: ${BUTTON_SIZE_MOBILE}px;
        border-radius: 10px;
      }
    `}
`;

export const MessageEditButtonsStyled = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const MessageActionsMenuModalOptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    flex-shrink: 0;
    color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
  }
`;

export const MessageActionsButtonText = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  font-size: 13px;
  line-height: 18px;
`;
