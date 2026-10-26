/* eslint-disable react/no-unknown-property */
import React, {
  forwardRef,
  LinkHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useTheme } from '../../theme';
import { useIsomorphicLayoutEffect } from '@/ui/utils';
import { ImageImg, ImagePicture, ImageSkeleton, ImageSource } from './styled';
import { ImageLoadingVariant } from './types';

export interface ImageAdaptive {
  src: string;
  width?: string | number;
  height?: string | number;
}

export interface ImageSrc {
  mobile?: string | ImageAdaptive;
  tablet?: string | ImageAdaptive;
  desktop?: string | ImageAdaptive;
}

export interface ImageProps
  extends Omit<
    React.ComponentProps<'img'>,
    'src' | 'alt' | 'width' | 'height' | 'loading'
  > {
  src?: string | ImageSrc;
  width?: string | number;
  height?: string | number;
  alt?: string;
  preload?: boolean;
  loading?: ImageLoadingVariant;
  /**
   * Native lazy loading (`loading="lazy"` on the `<img>`). With the skeleton,
   * the hidden image stays laid out (absolutely positioned and transparent),
   * so the browser can still start loading it; place the image in a
   * positioned container.
   */
  lazy?: boolean;
  fetchPriority?: LinkHTMLAttributes<HTMLLinkElement>['fetchPriority'];
}

const getAdaptiveSrc = (src: string | ImageAdaptive | undefined) =>
  typeof src === 'object' ? src.src : src;

const getAdaptiveSize = (
  src: string | ImageAdaptive | undefined,
  size: 'width' | 'height',
) => (typeof src === 'object' ? src[size] : undefined);

const getSrcKey = (src: ImageProps['src']): string => {
  if (typeof src !== 'object') {
    return src ?? '';
  }

  return [src.mobile, src.tablet, src.desktop].map(getAdaptiveSrc).join('|');
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      preload = false,
      loading = 'default',
      lazy = false,
      fetchPriority,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const isHidden = loading === 'skeleton' && isLoading;

    // Show the skeleton again when the image changes.
    const srcKey = getSrcKey(src);
    const [prevSrcKey, setPrevSrcKey] = useState(srcKey);
    if (prevSrcKey !== srcKey) {
      setPrevSrcKey(srcKey);
      setIsLoading(true);
    }

    const imgRef = useRef<HTMLImageElement | null>(null);
    const setImgRef = useCallback(
      (node: HTMLImageElement | null) => {
        imgRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // A cached image (or one loaded before hydration) may be complete before
    // React listens to its load event.
    useIsomorphicLayoutEffect(() => {
      const img = imgRef.current;

      if (img && img.complete && img.naturalWidth > 0) {
        setIsLoading(false);
      }
    }, [srcKey]);

    const { onLoad } = props;
    const handleLoad = useCallback<React.ReactEventHandler<HTMLImageElement>>(
      (event) => {
        setIsLoading(false);
        onLoad?.(event);
      },
      [onLoad],
    );

    const pictureImgSrc =
      typeof src === 'object'
        ? (src.desktop ?? src.tablet ?? src.mobile)
        : undefined;

    return (
      <>
        {isHidden && (
          <ImageSkeleton
            $width={width}
            $height={height}
            className={props.className}
            width={width}
            height={height}
          />
        )}
        {typeof src === 'string' && (
          <ImageImg
            ref={setImgRef}
            $hidden={isHidden}
            $lazy={lazy}
            loading={lazy ? 'lazy' : undefined}
            {...props}
            src={src}
            width={width}
            height={height}
            alt={alt}
            onLoad={handleLoad}
          />
        )}
        {typeof src === 'object' && (
          <ImagePicture
            $hidden={isHidden}
            {...props}
          >
            {src.mobile && (
              <ImageSource
                srcSet={getAdaptiveSrc(src.mobile)}
                width={getAdaptiveSize(src.mobile, 'width')}
                height={getAdaptiveSize(src.mobile, 'height')}
                media={`(max-width: ${theme.mobile.maxWidth})`}
              />
            )}
            {src.tablet && (
              <ImageSource
                srcSet={getAdaptiveSrc(src.tablet)}
                width={getAdaptiveSize(src.tablet, 'width')}
                height={getAdaptiveSize(src.tablet, 'height')}
                media={`(max-width: ${theme.tablet.maxWidth})`}
              />
            )}
            {/* The load event fires on the <img> only, so it is always
                rendered: without a desktop source it falls back to the
                tablet or the mobile one. */}
            {pictureImgSrc && (
              <ImageImg
                ref={setImgRef}
                $hidden={isHidden}
                $lazy={false}
                loading={lazy && loading !== 'skeleton' ? 'lazy' : undefined}
                src={getAdaptiveSrc(pictureImgSrc)}
                width={getAdaptiveSize(pictureImgSrc, 'width')}
                height={getAdaptiveSize(pictureImgSrc, 'height')}
                alt={alt}
                onLoad={handleLoad}
              />
            )}
          </ImagePicture>
        )}
        {/* React 19 hoists these <link> elements into <head>. */}
        {preload && typeof src === 'string' && (
          <link
            rel="preload"
            href={src}
            as="image"
            fetchPriority={fetchPriority}
          />
        )}
        {preload && typeof src === 'object' && src.mobile && (
          <link
            rel="preload"
            href={getAdaptiveSrc(src.mobile)}
            as="image"
            media={`(max-width: ${theme.mobile.maxWidth})`}
            fetchPriority={fetchPriority}
          />
        )}
        {preload && typeof src === 'object' && src.tablet && (
          <link
            rel="preload"
            fetchPriority={fetchPriority}
            href={getAdaptiveSrc(src.tablet)}
            as="image"
            media={`(min-width: ${parseInt(theme.mobile.maxWidth) + 0.1}px) and (max-width: ${theme.tablet.maxWidth})`}
          />
        )}
        {preload && typeof src === 'object' && src.desktop && (
          <link
            rel="preload"
            fetchPriority={fetchPriority}
            href={getAdaptiveSrc(src.desktop)}
            as="image"
            media={`(min-width: ${parseInt(theme.tablet.maxWidth) + 0.1}px)`}
          />
        )}
      </>
    );
  },
);

export * from './types';
export * from './styled';
