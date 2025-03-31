import { styled, css } from 'styled-components';
import { Scrollbar } from '../scrollbar';

export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SliderWrapper = styled(Scrollbar)<{ $gap?: number }>`
  display: flex;
  gap: ${({ $gap }) => $gap || 0}px;
  scrollbar-width: none;
`;

export const SliderLeftArrow = styled.div<{ $hidden: boolean }>`
  width: 80px;
  height: 100%;
  background: linear-gradient(
    -90deg,
    rgba(14, 12, 21, 0) 0%,
    rgba(14, 12, 21, 1) 100%
  );
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transition: opacity 0.2s;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `};

  svg {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(90deg);
  }
`;

export const SliderRightArrow = styled(SliderLeftArrow)`
  left: unset;
  right: 0;
  transform: rotate(180deg);
`;

export const SliderIconContainer = styled.button`
  all: unset;
  cursor: pointer;
`;
