import { styled } from 'styled-components';
import { animated } from '@react-spring/web';

export const BackdropStyled = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: ${({ theme }) => theme.zIndex.backdrop};
  cursor: pointer;
  overflow: auto;
`;
