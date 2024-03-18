import { styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '@/ui/components/typography';

export const HeaderNavDropdownItemStyled = styled.a`
  display: flex;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    width: 100%;
  }
`;

export const HeaderNavDropdownItemContent: React.FC<React.ComponentProps<'div'> & HTMLMotionProps<'div'>> = styled(motion.div)`
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
`;

export const HeaderNavDropdownInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderNavDropdownTitle = styled(Typography)`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px; 
`;

export const HeaderNavDropdownText = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;
