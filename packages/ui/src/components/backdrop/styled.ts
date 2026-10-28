import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { adaptive } from '@/ui/adaptive';

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
  /* Constant: only the opacity is animated */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: ${({ theme }) => theme.zIndex.backdrop};
  cursor: pointer;
  overflow: auto;
  /* A full screen blur is too heavy for phones and tablets */
  ${adaptive({
    touch: css`
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    `,
  })}
`;
