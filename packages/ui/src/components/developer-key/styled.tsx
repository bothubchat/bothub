import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { CopyIcon } from '@/ui/icons/copy';
import { TrashIcon } from '@/ui/icons/trash';

export interface DeveloperKeyStyledProps {
  $skeleton: boolean;
}

export const DeveloperKeyWrapper = styled.div<{ $skeleton?: boolean }>`
  display: flex;
  ${({ $skeleton }) =>
    $skeleton &&
    css`
      width: 100%;
    `}
  max-width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

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

export const DeveloperKeyContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const DeveloperKeyLabel = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;

export const DeveloperKeyValue = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.default.colors.grayScale.gray1};
  user-select: none;
`;

export const DeveloperKeyCopyIcon = styled(CopyIcon)``;

export const DeveloperKeyDeleteButton = styled.button<{ $skeleton?: boolean }>`
  all: unset;
  margin: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $skeleton }) =>
    !$skeleton
      ? css`
          &:hover {
            cursor: pointer;
            filter: brightness(1.2);
          }
          &:active {
            opacity: 0.6;
            transform: translateY(1px);
          }
        `
      : css`
          &:hover {
            cursor: progress;
          }
        `}
  transition: 0.05s ease-in-out;
`;

export const DeveloperKeyDeleteIcon = styled(TrashIcon)``;
