import { styled } from 'styled-components';
import { AnimationProps, HoverHandlers, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '../typography';
import { Arrow2DownIcon } from '@/ui/icons/arrow-2-down';

export const AccordionStyled: React.FC<React.ComponentProps<'div'> & AnimationProps & HoverHandlers> = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  width: 100%;
  max-width: 638px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
`;

export const AccordionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 18px;
  cursor: pointer;
`;

export const AccordionLabel = styled(Typography).attrs({ variant: 'body-m-semibold' })``;

export const AccordionArrow = styled(Arrow2DownIcon).attrs({ size: 24 })``;

export const AccordionBody = styled.div`
  padding: 18px;
  padding-top: 0px;
  margin-top: -4px;
`;

export const AccordionText = styled(Typography).attrs({ variant: 'body-m-regular', component: 'p' })`
  white-space: pre-wrap;
`;
