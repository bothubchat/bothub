import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MessageAdditiveActionsStyled = styled.div`
  margin-top: auto;
  display: flex;
`;

export const MessageAdditiveActionsButton = styled(motion.button).attrs({
  whileHover: {
    opacity: 0.8,
  },
  whileTap: {
    opacity: 0.6,
    translateY: 1,
    transition: {
      duration: 0.1,
      ease: 'circOut',
    },
  },
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
})`
  all: unset;
  width: fit-content;
  height: fit-content;
  padding-inline: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
