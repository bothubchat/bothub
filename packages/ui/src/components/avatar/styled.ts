import { css, styled } from 'styled-components';
import { Skeleton } from '@/ui/components/skeleton';
import { AvatarVariant } from './types';

export interface AvatarStyledProps {
  $size: number;
  $children: boolean;
  $variant: AvatarVariant;
}

export const AvatarStyled = styled.span<AvatarStyledProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  overflow: hidden;
  ${({ $children }) =>
    !$children &&
    css`
      border-radius: 50%;
    `}
`;

export const AvatarObject = styled.object.attrs({ type: 'image/jpeg' })`
  display: inline-flex;
  width: inherit;
  height: inherit;
`;

export const AvatarSkeleton = styled(Skeleton).attrs({
  variant: 'circular',
  width: 40,
  height: 40,
})``;

export interface AvatarBgProps {
  $size: number;
  $variant: AvatarVariant;
}

export const AvatarBg = styled.div<AvatarBgProps>`
  display: inline-flex;
  overflow: hidden;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.colors.grayScale.gray1
      : theme.colors.grayScale.gray3};
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
`;
