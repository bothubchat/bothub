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
  $followContentHeight: boolean;
}

export const SelectFieldGroupContent = styled.div<SelectFieldGroupContentProps>`
  display: flex;
  width: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 8px;
  width: 100%;
  ${({ $disableScrollbar, $size, $followContentHeight }) =>
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
        if ($followContentHeight) {
          return '100%';
        }

        switch ($size) {
          case 'small':
            return '186px';
          case 'md':
            return '186px';
          case 'large':
            return '400px';
        }
      }};

      /* @media (max-height: 560px) {
        max-height: 186px;
      } */
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
          inset: -5px 18px auto 10px;
          box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.5);
        `
      : css`
          inset: auto 18px -5px 10px;
          box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.5);
        `};
`;
