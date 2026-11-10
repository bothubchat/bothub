import { css, styled } from 'styled-components';
import { Skeleton } from '@/ui/components/skeleton';

export interface ImageImgProps {
  $hidden: boolean;
  $lazy?: boolean;
}

export const ImageImg = styled.img<ImageImgProps>`
  ${({ $hidden, $lazy }) => {
    if (!$hidden) {
      return css``;
    }

    // A lazy image with display: none would never start loading.
    if ($lazy) {
      return css`
        position: absolute !important;
        top: 0;
        left: 0;
        opacity: 0 !important;
        pointer-events: none !important;
      `;
    }

    return css`
      display: none !important;
    `;
  }}
  ${({ width }) => {
    if (typeof width === 'undefined') {
      return css``;
    }
    if (typeof width === 'number') {
      return css`
        width: ${width}px;
      `;
    }

    return css`
      width: ${width};
    `;
  }}
  ${({ height }) => {
    if (typeof height === 'undefined') {
      return css``;
    }
    if (typeof height === 'number') {
      return css`
        height: ${height}px;
      `;
    }

    return css`
      height: ${height};
    `;
  }}
`;

export interface ImagePictureProps {
  $hidden: boolean;
}

export const ImagePicture = styled.picture<ImagePictureProps>`
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}
`;

export const ImageSource = styled.source``;

export interface ImageSkeletonProps {
  $width?: string | number;
  $height?: string | number;
}

export const ImageSkeleton = styled(Skeleton)<ImageSkeletonProps>`
  ${({ $width }) =>
    typeof $width === 'number' &&
    css`
      width: ${$width}px !important;
    `}
  ${({ $height }) =>
    typeof $height === 'number' &&
    css`
      height: ${$height}px !important;
    `}
  border-radius: 0px;
`;
