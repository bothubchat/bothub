import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { styled } from 'styled-components';

export const IconStyled: React.FC<React.ComponentProps<'svg'> & AnimationProps> = styled(motion.svg)`
  display: inline-flex;
  flex-shrink: 0;
`;
