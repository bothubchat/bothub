import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';

export const ThemeButtonWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export interface ThemeButtonStyledProps {
  $active?: boolean;
}

export const ThemeButtonStyled = styled.button<ThemeButtonStyledProps>`
  all: unset;
  padding: 10px;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.accent.primary : theme.colors.grayScale.gray2};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.premiumGradient};
  }
`;

export const ThemeButtonIconStyled = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const ThemeButtonActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ThemeButtonAction = styled(Button).attrs({
  variant: 'text'
})``;

export const ThemeButtonEditAction = styled(ThemeButtonAction).attrs({
  children: <EditIcon />
})``;

export const ThemeButtonDeleteAction = styled(ThemeButtonAction).attrs({
  children: <TrashIcon />
})``;
