import { styled, css, keyframes } from 'styled-components';
import { SkeletonVariant } from './types';

// Sizes, colors and opacity come from custom properties set inline by
// `Skeleton`, so these keyframes and the class below don't change per value.
export const skeletonProperties = {
  width: '--bothub-skeleton-width',
  height: '--bothub-skeleton-height',
  colorFrom: '--bothub-skeleton-color-from',
  colorTo: '--bothub-skeleton-color-to',
  opacityFrom: '--bothub-skeleton-opacity-from',
  opacityTo: '--bothub-skeleton-opacity-to',
} as const;

const pulse = keyframes`
  0% {
    background: var(${skeletonProperties.colorFrom});
    opacity: var(${skeletonProperties.opacityFrom}, 1);
  }
  85% {
    background: var(${skeletonProperties.colorTo});
    opacity: var(${skeletonProperties.opacityTo}, 1);
  }
  100% {
    background: var(${skeletonProperties.colorFrom});
    opacity: var(${skeletonProperties.opacityFrom}, 1);
  }
`;

export interface SkeletonStyledProps {
  $variant?: SkeletonVariant;
}

export const SkeletonStyled = styled.span<SkeletonStyledProps>`
  display: inline-flex;
  flex-shrink: 0;
  vertical-align: middle;
  width: var(${skeletonProperties.width}, var(--skeleton-width, 40px));
  height: var(${skeletonProperties.height}, var(--skeleton-height, 40px));
  background: ${({ theme }) => theme.colors.grayScale.gray1};
  cursor: progress;
  ${({ $variant }) => {
    switch ($variant) {
      case 'rectangular':
        return css`
          border-radius: 0px;
        `;
      case 'circular':
        return css`
          border-radius: 50%;
        `;
      default:
        return css`
          border-radius: var(--skeleton-radius, 4px);
        `;
    }
  }}
  ${skeletonProperties.colorFrom}: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray5};
  ${skeletonProperties.colorTo}: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.colors.grayScale.gray5
      : theme.colors.grayScale.gray1};
  animation: ${pulse} 2s infinite forwards;
  overflow: hidden;
`;
