import { css } from 'styled-components';
import { themeVar } from '@/ui/theme';

export const ScrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => themeVar(theme, 'colors.accent.primaryLight')};
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray5')};
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
`;
