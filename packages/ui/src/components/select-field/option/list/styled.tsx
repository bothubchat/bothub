import { styled, css } from 'styled-components';
import { SelectFieldSize } from '@/ui/components/select-field/types';
import { Typography } from '@/ui/components/typography';

export interface SelectFieldOptionsStyledProps {
  $size: SelectFieldSize;
}

export const SelectFieldOptionsStyled = styled.div<SelectFieldOptionsStyledProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 4;
      case 'md':
        return 6;
      case 'large':
        return 8;
    }
  }}px;
`;

export const SelectFieldDivider = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

export interface SelectFieldEmptyProps {
  $size: SelectFieldSize;
}

export const SelectFieldEmpty = styled.div<SelectFieldEmptyProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 12;
      case 'large':
        return 12;
    }
  }}px;
`;

export const SelectFieldRadio = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  position: relative;

  & > * {
    position: relative;
    z-index: 1;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 8px;
    inset: 0;
    opacity: 0.2;
    transition: background 0.2s;

    ${({ $selected }) =>
      $selected &&
      css`
        background: linear-gradient(
          90deg,
          rgba(28, 100, 242, 1) 0%,
          rgba(212, 28, 242, 1) 100%
        );
      `};
  }

  &:hover:before {
    background-color: ${({ theme }) => theme.colors.accent.primary};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      & > * > ${SelectFieldRadioLabel} {
        opacity: 0.5;
      }
    `}
`;

export const SelectFieldRadioTitleAndRadio = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: inherit;
`;

export const SelectFieldRadioLabel = styled(Typography).attrs({
  variant: 'body-m-semibold'
})`
  width: 100%;
`;

export const SelectFieldRadioDescription = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;

export const SelectFieldEmptyText = styled(Typography).attrs({
  variant: 'input-sm'
})`
  text-align: center;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const SelectFieldOptionSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectFieldOptionLabel = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  padding-right: 8px;
`;
