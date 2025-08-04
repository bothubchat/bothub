import { css, styled } from 'styled-components';
import { Button, ButtonVariant } from '@/ui/components/button';
import { TrashIcon } from '@/ui/icons/trash';
import { adaptive } from '@/ui/adaptive';
import { AddGroupIcon } from '@/ui/icons/add-group';
import { ManageChatIcon } from '@/ui/icons/manage-chat';
import { SearchSimpleIcon } from '@/ui/icons/search-simple';
import { isBright } from '@/ui/utils';

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
      `,
    })}
`;

export const SidebarDeleteButton = styled(Button).attrs({
  fullWidth: true,
  startIcon: <TrashIcon />,
})``;

export const SidebarAddGroupButton = styled(Button).attrs({
  children: <AddGroupIcon />,
})<{ variant: ButtonVariant }>`
  ${({ variant, theme }) => {
    if (variant !== 'secondary') {
      return css``;
    }

    const stroke = css`
      svg path {
        stroke: ${theme.bright && theme.mode === 'light'
          ? theme.default.colors.base.black
          : theme.colors.accent.primary};
      }
    `;

    if (theme.scheme === 'custom') {
      return css`
        background-color: ${theme.bright
          ? theme.default.colors.base.white
          : theme.colors.grayScale.gray4};
        ${stroke}
      `;
    }

    return css`
      background-color: ${isBright(theme.colors.grayScale.gray4) ||
      theme.mode === 'light'
        ? theme.default.colors.base.white
        : theme.default.colors.grayScale.gray3};
      ${stroke}
    `;
  }}
`;

export const SidebarEditButton = styled(Button).attrs({
  children: <ManageChatIcon />,
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
  children: <SearchSimpleIcon size={16} />,
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
