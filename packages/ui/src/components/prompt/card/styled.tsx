import { css, styled } from 'styled-components';
import { CopyIcon } from '@/ui/icons/copy';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export const PromptCardStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1290px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.colors.accent.primary};
  }
  &:focus {
    cursor: default;
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.colors.accent.primary};
  }
  ${adaptive(() => ({
    desktop: css`
      padding: 16px;
    `,
    tablet: css`
      padding: 14px;
    `,
    mobile: css`
      padding: 10px;
    `
  }))}
`;

export const PromptCardContent = styled.div`
  display: flex;
  gap: 8px;
`;

export const PromptCardCopyIcon = styled(CopyIcon)``;

export const PromptCardText = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;
