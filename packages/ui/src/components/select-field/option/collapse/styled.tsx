import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { SelectFieldSize } from '@/ui/components/select-field';

export interface SelectFieldCollapseOptionStyledProps {
  $size: SelectFieldSize;
}

export const SelectFieldCollapseOptionStyled = styled.div<SelectFieldCollapseOptionStyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 4;
      case 'md':
        return 6;
    }
  }}px;
`;

export interface SelectFieldCollapseOptionHeadProps {
  $disabled: boolean;
  $size: SelectFieldSize;
}

export const SelectFieldCollapseOptionHead = styled.div<SelectFieldCollapseOptionHeadProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 12;
    }
  }}px;
  border-radius: 6px;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 10;
    }
  }}px;
  ${({ theme, $disabled }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
        opacity: 0.5;
        &:hover {
          background: ${theme.mode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)'};
        }
      `;
    }

    return css`
      cursor: pointer;
      &:hover {
        background: ${theme.mode === 'light'
          ? 'rgba(0, 0, 0, 0.05)'
          : 'rgba(255, 255, 255, 0.05)'};
      }
    `;
  }}
  user-select: none;
`;

export interface SelectFieldCollapseOptionHeadSideProps {
  $size: SelectFieldSize;
}

export const SelectFieldCollapseOptionHeadSide = styled.div<SelectFieldCollapseOptionHeadSideProps>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 10;
    }
  }}px;
`;

export interface SelectFieldCollapseOptionTextProps {
  $bold?: boolean;
}
export const SelectFieldCollapseOptionText = styled(Typography).attrs({
  variant: 'input-sm'
})<SelectFieldCollapseOptionTextProps>`
  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: 500;
    `}
`;

export const SelectFieldCollapseOptionArrow = styled(ArrowDownIcon).attrs(
  ({ theme }) => ({
    size: 16,
    fill: theme.colors.base.white
  })
)`
  transition: transform 0.2s ease-in-out;
`;

export const SelectFieldCollapseOptionBody = styled.div``;
