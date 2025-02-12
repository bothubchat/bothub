import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { DeleteChatIcon } from '@/ui/icons/delete-chat';

export const SidebarEmptyGroupStyled = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const SidebarEmptyGroupIcon = styled(DeleteChatIcon)`
  ${({ theme }) =>
    theme.mode === 'dark'
      ? css`
          path {
            stroke: ${({ theme }) => theme.colors.grayScale.gray6};
          }
        `
      : css`
    path {
      stroke: ${({ theme }) => theme.colors.grayScale.gray1};
    }
  }`}
`;

export const SidebarEmptyGroupText = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  color: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.grayScale.gray6
      : theme.colors.grayScale.gray1};
`;
