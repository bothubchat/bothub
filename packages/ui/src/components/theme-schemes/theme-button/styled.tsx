import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';

export const ThemeButtonWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export interface ThemeButtonOutlineStyledProps {
  $active?: boolean;
}

export const ThemeButtonOutlineStyled = styled.div<ThemeButtonOutlineStyledProps>`
  border: 1px solid transparent;
  ${({ $active }) =>
    $active
      ? css`
          background: ${({ theme }) => theme.colors.premiumGradient};
        `
      : css`
          border-color: ${({ theme }) => theme.colors.grayScale.gray2};
        `}
  border-radius: 20px;
`;

export const ThemeButtonStyled = styled.button`
  all: unset;
  padding: 8px;
  border-radius: 18px;
  background-color: ${({ theme }) =>
    theme.scheme === 'custom'
      ? theme.colors.custom.background
      : theme.colors.base.black};
  &:hover {
    cursor: pointer;
  }
`;

export const ThemeButtonIconStyled = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const ThemeButtonActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ThemeButtonAction = styled(Button).attrs({
  variant: 'text',
})``;

export const ThemeButtonEditAction = styled(ThemeButtonAction).attrs({
  children: <EditIcon />,
})``;

export const ThemeButtonDeleteAction = styled(ThemeButtonAction).attrs({
  children: <TrashIcon />,
})``;
