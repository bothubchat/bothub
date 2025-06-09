import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { SelectFieldPlacement, SelectFieldSize } from '../types';
import { ScrollableTabs } from '../../scrollable-tabs';
import { TextField } from '../../text-field';

export interface SelectModalStyledProps {
  $contentWidth?: number;
  $isOpen: boolean;
}

export const SelectModalStyled = styled(animated.div)<SelectModalStyledProps>`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.select};
  width: ${({ $contentWidth }) => $contentWidth}px;
  min-width: 200px;
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.2s;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

export interface SelectModalPositionWrapperProps {
  $blur: boolean;
  $placement: SelectFieldPlacement;
}

export const SelectModalPositionWrapper = styled.div<SelectModalPositionWrapperProps>`
  display: flex;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 0 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  background: ${({ theme, $blur }) => {
    if ($blur) {
      return theme.mode === 'light'
        ? 'rgba(255, 255, 255, 0.65)'
        : 'rgba(18, 24, 37, 0.75)';
    }

    return theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4;
  }};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  ${({ $placement }) => {
    if ($placement.includes('top')) {
      return css`
        bottom: 0px;
        margin-bottom: 10px;
      `;
    }
    return css`
      top: 0px;
      margin-top: 10px;
    `;
  }}
`;

export const SelectModalContent = styled.div`
  display: flex;
  width: 100%;
`;

export interface SelectModalGroupsProps {
  $size: SelectFieldSize;
}

export const SelectModalGroups = styled.div<SelectModalGroupsProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 4;
      case 'md':
        return 6;
      case 'large':
        return 8;
    }
  }}px;
`;

export const SelectModalTabsContainer = styled.div`
  width: 100%;
  padding-right: 8px;
`;

export const SelectModalTabs = styled(ScrollableTabs).attrs({
  variant: 'secondary',
  component: 'button'
})``;

export const SelectModalSearch = styled(TextField).attrs({
  fullWidth: true,
  variant: 'secondary'
})`
  padding-right: 8px;
`;
