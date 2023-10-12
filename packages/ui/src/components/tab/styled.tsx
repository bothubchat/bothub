import { styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Typography } from '@/ui/components/typography';

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
  padding: 10px 20px;
  flex-shrink: 0;
`; 

export const TabText = styled(Typography).attrs({ variant: 'body-m-semibold' })``;
