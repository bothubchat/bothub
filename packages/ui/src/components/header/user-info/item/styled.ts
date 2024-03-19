import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { styled } from 'styled-components';

export const HeaderUserInfoItemStyled = styled.a`
  display: inline-flex;
  width: 100%;
`;

export const HeaderUserInfoItemContent: React.FC<React.ComponentProps<'span'> & HTMLMotionProps<'span'>> = styled(motion.span)`
  display: inline-flex;
  width: 100%;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.base.white};
  line-height: 18px;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;
`;
