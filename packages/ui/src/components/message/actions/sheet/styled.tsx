import { animated } from '@react-spring/web';
import { styled } from 'styled-components';
import { colorToRgba } from '@/ui/utils';
import { themeVar } from '@/ui/theme';
import {
  MessageActionsButtonText,
  MessageActionsMenuModalOption,
  MessageActionsMenuModalOptionContent,
} from '../styled';

export const MessageActionsSheetBackdrop = styled(animated.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  inset: 0;
  background: ${({ theme }) =>
    colorToRgba(theme.default.colors.base.black, 0.62)};
  /* Лента под шторкой не прокручивается пальцем */
  touch-action: none;
`;

/** Шторка действий на телефоне: поднимается снизу, как меню чата */
export const MessageActionsSheetStyled = styled(animated.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 85svh;
  padding: 0 12px calc(16px + env(safe-area-inset-bottom));
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid
    ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => themeVar(theme, 'tokens.surfaceRaised')};
  color: ${({ theme }) => themeVar(theme, 'tokens.textStrong')};
  box-shadow: 0 -20px 50px
    ${({ theme }) => colorToRgba(theme.default.colors.base.black, 0.5)};
`;

export const MessageActionsSheetHandle = styled.span`
  flex: none;
  align-self: center;
  width: 40px;
  height: 4px;
  margin: 8px 0 6px;
  border-radius: 2px;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
`;

export const MessageActionsSheetTitle = styled.h2`
  flex: none;
  margin: 0;
  padding: 0 4px 8px;
  overflow: hidden;
  font-size: 17px;
  line-height: 24px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Те же пункты, что в меню, но под палец: выше и с подписью крупнее */
export const MessageActionsSheetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  ${MessageActionsMenuModalOption} {
    min-height: 48px;
    padding: 0 10px;
    border-radius: 10px;
  }
  ${MessageActionsMenuModalOptionContent} {
    gap: 12px;
  }
  ${MessageActionsButtonText} {
    font-size: 14px;
    line-height: 20px;
  }
`;
