import { styled } from 'styled-components';
import { Skeleton } from '@/ui/components/skeleton';

export interface AvatarStyledProps {
  $size: number;
}

export const AvatarStyled = styled.span<AvatarStyledProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden; 
`;

export const AvatarObject = styled.object.attrs({ type: 'image/jpeg' })`
  display: inline-flex;
  width: inherit;
  height: inherit;
`;

export const AvatarImage = styled.img`
  display: inline-flex;
  width: inherit;
  height: inherit;
  background: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const AvatarSkeleton = styled(Skeleton).attrs({
  variant: 'circular',
  width: 40,
  height: 40
})``;
