import { styled } from 'styled-components';
import { Typography } from '../typography';

export const SwitcherContainer = styled.div`
  display: inline-flex;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 25px;
  padding: 2px 4px;
  width: fit-content;
`;

export const SwitcherOption = styled(Typography).attrs({
  forwardedAs: 'button',
  variant: 'button-sm',
})`
  position: relative;
  z-index: 2;
  padding: 2px 12px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.base.white};
  transition: color 0.3s ease;
  border-radius: 20px;
  white-space: nowrap;
  outline: none;
`;

export const SwitcherSlider = styled.div`
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  background-color: ${({ theme }) => theme.colors.accent.primary};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
