import styled from 'styled-components';
import { Typography } from '../../../../typography';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export const HeaderNavDropdownItemStyled = styled.a`
  display: flex;
`;

export const HeaderNavDropdownItemContent: React.FC<React.ComponentProps<"div"> & HTMLMotionProps<"div">> = styled(motion.div)`
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 14px;
  border-radius: 8px;
`;

export const HeaderNavDropdownInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderNavDropdownTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-size: 16px;
  line-height: 22px; 
`;

export const HeaderNavDropdownText = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;
