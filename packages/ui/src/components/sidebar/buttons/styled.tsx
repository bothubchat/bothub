import { css, styled } from 'styled-components';
import { Button, ButtonVariant } from '@/ui/components/button';
import { TrashIcon } from '@/ui/icons/trash';
import { adaptive } from '@/ui/adaptive';
import { AddChatIcon } from '@/ui/icons/add-chat';
import { AddGroupIcon } from '@/ui/icons/add-group';
import { EditIcon } from '@/ui/icons/edit';

export interface SidebarButtonsStyledProps {
  $open: boolean;
}

export const SidebarButtonsStyled = styled.div<SidebarButtonsStyledProps>`
  display: flex;
  flex-direction: row;
  transition: all 0.3s;
  width: 100%;
  gap: 12px;
  ${({ $open }) => !$open && adaptive(
    {
      variant: 'dashboard',
      merge: true,
      desktop: css`flex-direction: column;`,
      tablet: css`flex-direction: row;`
    }
  )}
`;

export const SidebarDeleteButton = styled(Button).attrs({
  variant: 'primary',
  fullWidth: true,
  startIcon: <TrashIcon />,
  color: '#FE4242',
})``;

export const SidebarCreateChatButton = styled(Button).attrs({
  children: <AddChatIcon />,
}) <{ variant: ButtonVariant }>``;

export const SidebarAddGroupButton = styled(Button).attrs({
  children: <AddGroupIcon />
}) <{ variant: ButtonVariant }>`
  ${({ variant }) => variant === 'secondary' && css`
    background: ${({ theme }) => theme.colors.grayScale.gray3};
    svg path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  `}
`;

export const SidebarEditButton = styled(Button).attrs({
  children: <EditIcon />,
}) <{ variant: ButtonVariant }>`
  ${({ variant }) => variant === 'secondary' && css`
    svg path {
      fill: ${({ theme }) => theme.colors.grayScale.gray1};
      stroke: ${({ theme }) => theme.colors.grayScale.gray1};
    }
  `}
`;

export const SidebarSearchButton: React.FC<{ $variant: ButtonVariant }> = styled(Button).attrs({
  children: <TrashIcon />
})``;

export const SidebarSortButton: React.FC<{ $variant: ButtonVariant }> = styled(Button).attrs({
  children: <TrashIcon />
})``;
