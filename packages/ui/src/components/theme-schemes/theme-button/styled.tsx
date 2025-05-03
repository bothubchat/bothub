import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';

export const ThemeButtonWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: fit-content;
  height: fit-content;
`;

export interface ThemeButtonStyledProps {
  $active?: boolean;
}

export const ThemeButtonStyled = styled.button<ThemeButtonStyledProps>`
  all: unset;
  padding: 8px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.base.black};
  &:hover {
    cursor: pointer;
  }
  outline: 2px solid
    ${({ theme, $active }) =>
      !$active ? theme.colors.grayScale.gray2 : 'transparent'};
  position: relative;
  &::before {
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    position: absolute;
    top: -2px;
    left: -2px;
    background: ${({ theme }) => theme.colors.premiumGradient};
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
  }
  ${({ $active }) =>
    $active &&
    css`
      &::before {
        opacity: 1;
      }
    `}
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
  variant: 'text'
})``;

export const ThemeButtonEditAction = styled(ThemeButtonAction).attrs({
  children: <EditIcon />
})``;

export const ThemeButtonDeleteAction = styled(ThemeButtonAction).attrs({
  children: <TrashIcon />
})``;
