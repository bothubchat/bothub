import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { TrashIcon } from '@/ui/icons/trash';
import { AddChatIcon } from '@/ui/icons/add-chat';
import { AddGroupIcon } from '@/ui/icons/add-group';
import { ManageChatIcon } from '@/ui/icons/manage-chat';
import { SearchSimpleIcon } from '@/ui/icons/search-simple';
import { Button, ButtonVariant } from '@/ui/components/button';

export interface SidebarButtonsStyledProps {
  $open: boolean;
}

export const SidebarButtonsStyled = styled.div<SidebarButtonsStyledProps>`
  display: flex;
  flex-direction: row;
  transition: all 0.3s;
  width: 100%;
  gap: 12px;
  ${({ $open }) =>
    !$open &&
    adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        flex-direction: column;
      `,
      tablet: css`
        flex-direction: row;
      `
    })}
`;

export const SidebarDeleteButton = styled(Button).attrs({
  fullWidth: true,
  startIcon: <TrashIcon />
})``;

export const SidebarCreateChatButton = styled(Button).attrs({
  children: <AddChatIcon />
})``;

export const SidebarAddGroupButton = styled(Button).attrs({
  children: <AddGroupIcon />
})<{ variant: ButtonVariant }>`
  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      background: ${theme.mode === 'dark'
        ? theme.colors.grayScale.gray3
        : theme.colors.grayScale.gray4};
      svg path {
        stroke: ${theme.colors.accent.primary};
      }
    `}
`;

export const SidebarEditButton = styled(Button).attrs({
  children: <ManageChatIcon />
})<{ variant: ButtonVariant }>`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          svg path {
            stroke: ${theme.colors.grayScale.gray1};
          }
        `;
      case 'primary':
        return css`
          svg path {
            stroke: ${theme.default.colors.base.white};
          }
        `;
    }
  }}
`;

export const SidebarSearchButton = styled(Button).attrs({
  children: <SearchSimpleIcon size={16} />
})<{ variant: ButtonVariant }>`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          svg path {
            fill: ${theme.colors.grayScale.gray1};
          }
        `;
      case 'primary':
        return css`
          svg path {
            fill: ${theme.default.colors.base.white};
          }
        `;
    }
  }}
`;

export const SidebarSortButton = styled(Button)``;
