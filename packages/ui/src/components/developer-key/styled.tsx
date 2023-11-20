import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { CopyIcon } from '@/ui/icons';

export interface DeveloperKeyStyledProps {
  $skeleton: boolean;
}

export const DeveloperKeyStyled = styled.div<DeveloperKeyStyledProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  padding: 18px 16px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 8px;
  overflow: hidden;
  ${({ $skeleton }) => {
    if ($skeleton) {
      return css`
        cursor: progress;
      `;
    }

    return css`
      cursor: pointer;
      &:hover {
        border-color: ${({ theme }) => theme.colors.accent.primary};
      }
      &:focus {
        border-color: ${({ theme }) => theme.colors.accent.primary};
        cursor: default;
      }
    `;
  }}
`;

export const DeveloperKeyValue = styled(Typography).attrs({ variant: 'body-m-medium' })`
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.default.colors.grayScale.gray1};
  user-select: none;
`;

export const DeveloperKeyCopyIcon = styled(CopyIcon)``;
