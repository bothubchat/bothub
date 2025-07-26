import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';

export const SelectFieldCheckboxGroupOptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SelectFieldCheckboxGroupOptionHead = styled.div<{
  $disabled: boolean;
}>`
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme, $disabled }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
        &:hover {
          background: ${theme.mode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)'};
        }
        & > ${SelectFieldCheckboxGroupOptionHeadLeftSide}:first-child {
          opacity: 0.5;
        }
      `;
    }

    return css`
      cursor: pointer;
      &:hover {
        background: ${theme.colors.accent.primary}33;
      }
    `;
  }}
  user-select: none;
`;

export const SelectFieldCheckboxGroupOptionHeadLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const SelectFieldCheckboxGroupOptionHeadRightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SelectFieldCheckboxGroupOptionHeadTextWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
`;

export const SelectFieldCheckboxGroupOptionHeadText = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;

export const SelectFieldCheckboxGroupOptionHeadCounter = styled(
  Typography
).attrs({ variant: 'body-xs-medium' })`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;

export const SelectFieldCheckboxGroupOptionArrow = styled(ArrowDownIcon).attrs({
  size: 16
})`
  transition: transform 0.2s ease-in-out;
`;

export const SelectFieldCheckboxGroupOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
`;

export const ShowMoreButton = styled(Typography).attrs({
  variant: 'body-xs-medium'
})`
  cursor: pointer;
  text-align: center;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;
