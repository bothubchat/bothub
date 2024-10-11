import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MessageAdditiveActionsStyled = styled.div`
  margin-top: auto;
  display: flex;
`;

export const MessageAdditiveActionsButton = styled(motion.button)`
  all: unset;
  width: fit-content;
  height: fit-content;
  padding-inline: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
