import { styled } from 'styled-components';
import { colorToRgba } from '@/ui/utils';

export const SidebarListChatsStyled = styled.div<{
  $isSidebarOpen?: boolean;
  $isOver?: boolean;
}>`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  gap: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '4px' : '8px')};
  ${({ $isOver, theme }) =>
    $isOver &&
    `
      background: ${colorToRgba(theme.colors.accent.primaryLight, 0.4)};
      border-radius: 8px;
      `}
`;
