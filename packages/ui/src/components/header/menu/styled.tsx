import { AnimationProps, motion } from "framer-motion";
import { styled } from "styled-components";

export const HeaderMenuStyled: React.FC<AnimationProps & React.PropsWithChildren> = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: ${({ theme }) => theme.colors.base.black};
  padding: calc(${({ theme }) => theme.header.height} + 42px) 40px;
  gap: 30px;
  overflow: auto;
  z-index: ${({ theme }) => theme.zIndex.menu};
  @media not (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: calc(${({ theme }) => theme.header.mobile.height} + 42px) 40px;
  }
`;
