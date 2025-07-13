import { css, styled } from 'styled-components';
import { Image } from '@/ui/components/image';
import { adaptive } from '@/ui/adaptive';
import { MessageImageButtonsStyled } from './button';
import { Skeleton } from '@/ui/components/skeleton';

export const MessageImageStyled = styled.div`
  display: inline-flex;
  border-radius: 10px;
  overflow: hidden;
  width: min-content;
  position: relative;
  ${MessageImageButtonsStyled} {
    transition: 0.225s opacity;
    opacity: 0;
    ${adaptive({
      touch: css`
        opacity: 1;
      `
    })}
  }
  &:hover {
    ${MessageImageButtonsStyled} {
      opacity: 1;
    }
  }
`;

export interface MessageImageSkeletonProps {
  $width: number;
  $height: number;
}

export const MessageImageSkeleton = styled(Skeleton)<MessageImageSkeletonProps>`
  display: flex;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 0px;
`;

export interface MessageImageNativeProps {
  $clickable: boolean;
  $progress: boolean;
  $loading: boolean;
}

export const MessageImageNative = styled(Image)<MessageImageNativeProps>`
  ${({ $loading }) =>
    $loading &&
    css`
      display: none;
    `}
  max-width: inherit;
  object-fit: cover;
  cursor: ${({ $progress, $clickable }) => {
    if ($progress) {
      return 'progress';
    }
    if ($clickable) {
      return 'pointer';
    }

    return 'default';
  }};
`;
