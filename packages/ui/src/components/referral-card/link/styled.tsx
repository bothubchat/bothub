import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { CopyIcon } from '@/ui/icons';

export const ReferralCardLinkStyled = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:focus {
    cursor: default;
  }
`;

export const ReferralCardLinkText = styled(Typography).attrs({ variant: 'body-m-medium' })`
  color: ${({ theme }) => theme.colors.accent.primary};
  max-width: 288px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReferralCardLinkCopyIcon = styled(CopyIcon)``;
