import { styled } from 'styled-components';

export const StyledLine = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: #fff;
  position: absolute;
  left: 0;
  transition:
    transform 0.15s ease,
    opacity 0.075s ease;
`;

export const StyledBurgerIcon = styled.div<{ $isOpen: boolean }>`
  width: 18px;
  height: 18px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > ${StyledLine}:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-4px) rotate(0)'};
  }

  & > ${StyledLine}:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
  }

  & > ${StyledLine}:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(4px) rotate(0)'};
  }
`;
