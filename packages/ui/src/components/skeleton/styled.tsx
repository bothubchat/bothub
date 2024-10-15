import {
  styled, css, DefaultTheme, keyframes 
} from 'styled-components';
import { SkeletonVariant } from './types';

const pulse = ({
  theme,
  $opacity,
  $colors,
}: {
  theme: DefaultTheme;
  $opacity?: [number, number?];
  $colors?: [string, string?];
}) => keyframes`
  0% {
    background: ${$colors?.[0] ?? (theme.mode === 'light'
    ? theme.colors.grayScale.gray2
    : theme.colors.grayScale.gray5)};
    opacity: ${$opacity?.[0] ?? 1};
  }
  85% {
    background: ${$colors?.[1] ?? (theme.mode === 'light'
    ? theme.colors.grayScale.gray5
    : theme.colors.grayScale.gray1)};
    opacity: ${$opacity?.[1] ?? 1};
  }
  100% {
    background: ${$colors?.[0] ?? (theme.mode === 'light'
    ? theme.colors.grayScale.gray2
    : theme.colors.grayScale.gray5)};
    opacity: ${$opacity?.[0] ?? 1};
  }
`;

export interface SkeletonStyledProps {
  $variant?: SkeletonVariant;
  $width?: number | string;
  $height?: number | string;
  $fullWidth: boolean;
  $colors?: [string, string?];
  $opacity?: [number, number?];
}

export const SkeletonStyled = styled.span<SkeletonStyledProps>`
  display: inline-flex;
  flex-shrink: 0;
  vertical-align: middle;
  width: ${({ $fullWidth, $width }) => {
    if ($fullWidth) {
      return '100%';
    }
    if (typeof $width === 'number' || typeof $width === 'string') {
      return `${$width}px`;
    }

    return 'var(--skeleton-width, 40px)';
  }};
  height: ${({ $height }) => {
    if (typeof $height === 'number' || typeof $height === 'string') {
      return `${$height}px`;
    }

    return 'var(--skeleton-height, 40px)';
  }};
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
  animation: ${({ theme, $opacity, $colors }) => css`
    ${pulse({
    theme,
    $opacity,
    $colors,
  })} 2s infinite forwards;
  `};
  overflow: hidden;
`;
