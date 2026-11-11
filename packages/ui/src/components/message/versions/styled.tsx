import { styled } from 'styled-components';
import { themeVar } from '@/ui/theme';

/** Версии сообщения в строке действий: стрелки и «2 / 3» между ними */
export const MessageVersionsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const MessageVersionsPagination = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;
  min-width: 30px;
`;

export const MessageVersionsText = styled.span`
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
`;

export const MessageVersionsSwitchButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 120ms ease-out,
    color 120ms ease-out;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => themeVar(theme, 'tokens.hoverOverlay')};
    color: ${({ theme }) => themeVar(theme, 'tokens.textStrong')};
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
    opacity: 0.4;
  }
`;

export const MessageVersionsPrevIcon = styled.span`
  display: flex;
  transform: rotate(180deg);
`;
