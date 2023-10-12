import { styled } from 'styled-components';
import { CopyIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export const PromptCardStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1290px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.accent.primary};
  }
  &:focus {
    cursor: default;
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const PromptCardContent = styled.div`
  display: flex;
  gap: 8px;
`;

export const PromptCardCopyIcon = styled(CopyIcon)``;

export const PromptCardText = styled(Typography).attrs({ variant: 'body-m-regular' })``;
