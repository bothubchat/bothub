import { styled, css } from 'styled-components';
import { SelectFieldSize } from '../types';

export const SelectFieldGroupStyled = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export interface SelectFieldGroupContentProps {
  $size: SelectFieldSize;
  $disableScrollbar: boolean;
}

export const SelectFieldGroupContent = styled.div<SelectFieldGroupContentProps>`
  display: flex;
  width: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 4px;
  width: 100%;
  ${({ $disableScrollbar, $size }) =>
    !$disableScrollbar &&
    css`
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.accent.primary};
        border-radius: 2px;
      }
      &::-webkit-scrollbar-corner {
        display: none;
      }
      max-height: ${() => {
        switch ($size) {
          case 'small':
            return 186;
          case 'md':
            return 186;
          case 'large':
            return 400;
        }
      }}px;

      @media (max-height: 560px) {
        max-height: 186px;
      }
    `}
`;

export interface ShadowProps {
  $show: boolean;
  $onTop?: boolean;
}

export const Shadow = styled.div<ShadowProps>`
  position: absolute;
  height: 5px;
  z-index: 1;
  transition: opacity 0.2s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};

  ${({ $onTop = false }) =>
    $onTop
      ? css`
          inset: -5px 0 auto 0;
          box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.75);
        `
      : css`
          inset: auto 0 -5px 0;
          box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.75);
        `};
`;
