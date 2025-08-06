import { styled } from 'styled-components';

export const ModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;
