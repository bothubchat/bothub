import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { Image } from '@/ui/components/image';

export const ChipStyled = styled.div`
  display: inline-flex;
  align-items: center;
  height: 38px;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 6px;
  padding: 0px 8px;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const ChipImage = styled(Image).attrs({ width: 18, height: 18 })`
  border-radius: 2px;
`;

export const ChipText = styled(Typography).attrs({ variant: 'body-s-medium' })`
  cursor: default;
  user-select: none;
`;

export const ChipDeleteButton = styled(Button).attrs({ variant: 'text', iconSize: 12, children: <CloseIcon /> })``;
