import { css, styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export interface TabStyledProps {
  $active: boolean;
}

export const TabStyled: React.FC<HTMLMotionProps<'button'> & TabStyledProps> = styled(motion.button)<TabStyledProps>`
  display: inline-flex;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  background: rgba(0, 0, 0, 0);
  border-radius: 8px;
  padding: 0px;
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  ${adaptive(() => ({
    merge: true,
    desktop: css`
      padding: 10px 20px;
    `,
    tablet: css`
      padding: 12px 20px;
    `
  }))}
`; 

export const TabText = styled(Typography).attrs({ variant: 'body-m-semibold' })``;
