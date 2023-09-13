import styled from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';

export const BackdropStyled: React.FC<React.ComponentProps<'div'> & AnimationProps> = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.55);
  z-index: ${({ theme, }) => theme.zIndex.backdrop};
  cursor: pointer;
  overflow: auto;
`;
