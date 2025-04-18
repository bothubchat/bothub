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
  height: 100%;
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
    `}
`;

export interface ShadowProps {
  $show: boolean;
  $onTop?: boolean;
}

export const Shadow = styled.div<ShadowProps>`
  position: absolute;
  height: 50px;
  z-index: 1;
  transition: opacity 0.2s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: none;

  ${({ $onTop = false, theme }) => {
    const color =
      theme.mode === 'dark'
        ? theme.colors.grayScale.gray4
        : theme.colors.base.black;

    return $onTop
      ? css`
          inset: -1px 8px auto 0;
          background: linear-gradient(0deg, ${color}00 0%, ${color} 100%);
        `
      : css`
          inset: auto 8px -1px 0;
          background: linear-gradient(180deg, ${color}00 0%, ${color} 100%);
        `;
  }}
`;
