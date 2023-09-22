import styled from "styled-components";
import { Typography } from "../typography";
import { Arrow2DownIcon } from "../icons";
import { AnimationProps, HoverHandlers, motion } from "framer-motion";
import React from "react";

export const AccordionStyled: React.FC<React.ComponentProps<'div'> & AnimationProps & HoverHandlers> = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  width: 100%;
  max-width: 738px;
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

export const AccordionArrow = styled(Arrow2DownIcon)``;

export const AccordionBody = styled.div`
  padding: 18px;
  padding-top: 0px;
  margin-top: -4px;
`;

export const AccordionText = styled(Typography).attrs({ variant: 'body-m-regular' })`
  white-space: pre-wrap;
`;
