import { AnimationProps, HoverHandlers, motion } from 'framer-motion';
import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons';

export const BookmarkName = styled(Typography).attrs({ variant: 'body-m-semibold', component: 'span' })`
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookmarkCloseButton = styled(Button).attrs({ variant: 'text', iconSize: 14, children: <CloseIcon /> })``;

export type BookmarkStyledProps = AnimationProps & HoverHandlers & {
  $active: boolean;
  className?: string;
} & React.ComponentProps<'span'> & React.PropsWithChildren;

export const BookmarkStyled: React.FC<BookmarkStyledProps> = styled(motion.span)<BookmarkStyledProps>`
  display: inline-flex;
  gap: 13px;
  flex-shrink: 0;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  height: 42px;
  margin: 1px;
  ${BookmarkName} {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  svg path {
    fill: ${({ theme }) => theme.colors.grayScale.gray1} !important;
  }
  ${({ $active }) => $active && css`
    cursor: default;
    background: ${({ theme }) => theme.colors.grayScale.gray3};
    ${BookmarkName} {
      color: ${({ theme }) => theme.colors.base.white};
    }
  `}
  ${({ $active }) => !$active && css`
    cursor: pointer; 
  `}
`;
