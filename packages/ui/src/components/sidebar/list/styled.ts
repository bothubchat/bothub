import { styled } from 'styled-components';

export const SidebarListChatsStyled = styled.div<{
  $isSidebarOpen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '4px' : '8px')};
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  padding-top: 8px;
`;
