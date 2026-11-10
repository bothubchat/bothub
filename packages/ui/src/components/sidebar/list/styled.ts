import { styled } from 'styled-components';
import { colorToRgba } from '@/ui/utils';
import { inCollapsedSidebar } from '../collapsed';

export const SidebarListChatsStyled = styled.div<{
  $isOver?: boolean;
}>`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  gap: 4px;
  ${inCollapsedSidebar} & {
    gap: 8px;
  }
  ${({ $isOver, theme }) =>
    $isOver &&
    `
      background: ${colorToRgba(theme.colors.accent.primaryLight, 0.4)};
      border-radius: 8px;
      `}
`;
