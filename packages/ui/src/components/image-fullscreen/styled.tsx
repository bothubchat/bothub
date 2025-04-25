import { styled, css } from 'styled-components';
import { Avatar } from '@/ui/components/avatar';
import { Typography } from '@/ui/components/typography';
import { Badge } from '@/ui/components/badge';
import { Backdrop } from '@/ui/components/backdrop';
import { Image } from '@/ui/components/image';
import { Button } from '@/ui/components/button';
import { Container } from '@/ui/components/container';
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';
import { ArrowNarrowRightIcon } from '@/ui/icons/arrow-narrow-right';
import { adaptive } from '@/ui/adaptive';
import { ZoommableImage } from './zoommable-image';

export const ImageFullScreenStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding-top: 34px;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  pointer-events: none;
  @media (max-height: 600px) {
    --bothub-scale: 0.8;
  }
  @media (max-height: 460px) {
    --bothub-scale: 0.6;
  }
  @media (max-height: 440px) {
    --bothub-scale: 0.5;
  }
`;

export const ImageFullScreenBackdrop = styled(Backdrop)`
  pointer-events: auto;
`;

export const ImageFullScreenContainer = styled(Container)`
  height: 100%;
`;

export const ImageFullScreenContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

export const ImageFullScreenTopBlock = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 17px;
  overflow: hidden;
  padding: 16px 24px;
  pointer-events: auto;
`;

export const ImageFullScreenTopBlockContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ImageFullScreenAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ImageFullScreenAuthorAvatar = styled(Avatar).attrs({ size: 30 })``;

export const ImageFullScreenAuthorName = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  cursor: default;
`;

export const ImageFullScreenAuthorTag = styled(Badge).attrs({
  variant: 'info'
})``;

export const ImageFullScreenToolbar = styled.div``;

export const ImageFullScreenMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ImageFullScreenCarousel = styled.div`
  position: relative;
  width: 100vw;
  overflow: hidden;
`;

export const ImageFullScreenCarouselContainer = styled.div`
  display: flex;
  will-change: transform;
  touch-action: none;
  user-select: none;
  width: 100%;
  height: 100%;

  transition: transform 0.3s ease-in-out;
`;

export const ImageFullScreenSlide = styled.div`
  width: 100vw;
  flex-shrink: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    pointer-events: all;
  }
  &:active {
    cursor: grabbing;
  }
`;

export const ImageFullScreenImage = styled(ZoommableImage)`
  & > * > img {
    object-fit: cover;
    width: auto;
    height: auto;
    max-height: min(60vh, 512px);
    pointer-events: none;
    user-select: none;
    ${adaptive({
      merge: true,
      desktop: css`
        max-width: 512px;
      `,
      mobile: css`
        max-width: 256px;
      `
    })}
    @media (max-height: 600px) {
      max-width: 256px;
      max-height: 256px;
    }
  }
  & > div > span {
    max-height: min(60vh, 512px);
    ${adaptive({
      merge: true,
      desktop: css`
        max-width: 512px;
      `,
      mobile: css`
        max-width: 256px;
      `
    })}
    @media (max-width: 600px) {
      max-width: 256px;
      max-height: 256px;
    }
    @media (max-height: 600px) {
      max-width: 256px;
      max-height: 256px;
    }
  }
`;

export interface ImageFullScreenCarouselButtonsProps {
  $imageWidth: number;
}

export const ImageFullScreenCarouselButtons = styled.div<ImageFullScreenCarouselButtonsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
  z-index: 1;
  pointer-events: none;
  ${adaptive(({ $imageWidth }) => ({
    merge: true,
    desktop: css`
      gap: calc(min(512px, ${$imageWidth}px) + 48px);
    `,
    mobile: css`
      gap: calc(min(256px, ${$imageWidth}px) + 48px);
    `
  }))}
  @media (max-height: 600px) {
    gap: calc(min(256px, ${({ $imageWidth }) => $imageWidth}px) + 48px);
  }
`;

export const ImageFullScreenCarouselPrevButton = styled(Button).attrs({
  children: <ArrowNarrowLeftIcon />
})`
  pointer-events: auto;
`;

export const ImageFullScreenCarouselNextButton = styled(Button).attrs({
  children: <ArrowNarrowRightIcon />
})`
  pointer-events: auto;
`;

export const ImageFullScreenPreview = styled.div`
  display: flex;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  margin-top: 20px;
  pointer-events: auto;
  ${adaptive({
    merge: true,
    desktop: css`
      padding: 10px;
    `,
    mobile: css`
      padding: 8px;
    `
  })}
`;

export const ImageFullScreenPreviewImages = styled.div`
  display: flex;
  gap: 10px;
`;

export interface ImageFullScreenPreviewImageProps {
  $active: boolean;
}

export const ImageFullScreenPreviewImage = styled(Image).attrs({
  width: 64,
  height: 64,
  loading: 'skeleton'
})<ImageFullScreenPreviewImageProps>`
  display: inline-flex;
  width: auto;
  border-radius: 10px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: 0.225s opacity;
  object-fit: cover;
  &:hover {
    opacity: 1;
  }
`;
