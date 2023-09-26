import { css } from 'styled-components';

export const ScrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.grayScale.gray4};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;
