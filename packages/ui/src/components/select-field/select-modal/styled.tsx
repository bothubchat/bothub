import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { SelectFieldPlacement, SelectFieldSize } from '../types';
import { ScrollableTabs } from '../../scrollable-tabs';
import { TextField } from '../../text-field';
import { SearchSimpleIcon } from '@/ui/icons';

export interface SelectFieldBlockProps {
  $contentWidth?: number;
}

export const SelectFieldBlock = styled.div<SelectFieldBlockProps>`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.select};
  width: ${({ $contentWidth }) => $contentWidth}px;
  min-width: 200px;
  width: 100%;
  box-sizing: border-box;
`;

export const AnimatedSelectFieldBlock = animated(SelectFieldBlock);

export interface SelectFieldBlockPositionWrapperProps {
  $blur: boolean;
  $placement: SelectFieldPlacement;
}

export const SelectFieldBlockPositionWrapper = styled.div<SelectFieldBlockPositionWrapperProps>`
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
    switch ($placement) {
      case 'bottom-left':
        return css`
          top: 0px;
          margin-top: 10px;
        `;
      case 'top-left':
      case 'top-right':
        return css`
          bottom: 0px;
          margin-bottom: 10px;
        `;
    }
  }}
`;

export const SelectFieldBlockContent = styled.div`
  display: flex;
  width: 100%;
`;

export interface SelectFieldGroupsProps {
  $size: SelectFieldSize;
}

export const SelectFieldGroups = styled.div<SelectFieldGroupsProps>`
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

export const SelectFieldTabsContainer = styled.div`
  width: 100%;
  padding-right: 8px;
`;

export const SelectFieldTabs = styled(ScrollableTabs).attrs({
  variant: 'secondary'
})``;

export const SelectFieldSearch = styled(TextField).attrs({
  fullWidth: true,
  startIcon: <SearchSimpleIcon />,
  variant: 'secondary'
})`
  padding-right: 8px;
`;
