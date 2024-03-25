import { css, styled } from 'styled-components';
import { Skeleton } from '@/ui/components/skeleton';

export interface ImageImgProps {
  $hidden: boolean;
}

export const ImageImg = styled.img<ImageImgProps>`
  ${({ $hidden }) => $hidden && css`
    display: none !important;
  `}
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
  ${({ $hidden }) => $hidden && css`
    display: none;
  `}
`;

export const ImageSource = styled.source``;

export interface ImageSkeletonProps {
  $width?: string | number;
  $height?: string | number;
}

export const ImageSkeleton = styled(Skeleton)<ImageSkeletonProps>`
  width: ${({ $width }) => $width}px !important;
  height: ${({ $height }) => $height}px !important;
  border-radius: 0px;
`;
