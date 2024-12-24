/* eslint-disable react/no-unknown-property */
import React, {
  forwardRef, LinkHTMLAttributes, useCallback, useState 
} from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../theme';
import {
  ImageImg, ImagePicture, ImageSkeleton, ImageSource 
} from './styled';
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

export interface ImageProps extends Omit<React.ComponentProps<'img'>, 'src' | 'alt' | 'width' | 'height' | 'loading'> {
  src?: string | ImageSrc;
  width?: string | number;
  height?: string | number;
  alt?: string;
  preload?: boolean;
  loading?: ImageLoadingVariant;
  fetchPriority?: LinkHTMLAttributes<HTMLLinkElement>['fetchPriority'];
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({
  src, alt, width, height, preload = false, loading = 'default', fetchPriority, ...props 
}, ref) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const isHidden = loading === 'skeleton' && isLoading;

  const handleLoad = useCallback<React.ReactEventHandler<HTMLImageElement>>((event) => {
    setIsLoading(false);
    props.onLoad?.(event);
  }, [props.onLoad]);

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
          ref={ref}
          $hidden={isHidden}
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
              srcSet={typeof src.mobile === 'string' ? src.mobile : src.mobile.src}
              width={typeof src.mobile === 'object' ? src.mobile.width : undefined}
              height={typeof src.mobile === 'object' ? src.mobile.height : undefined}
              media={`(max-width: ${theme.mobile.maxWidth})`}
              onLoad={handleLoad as unknown as React.ReactEventHandler<HTMLSourceElement>}  
            />
          )}
          {src.tablet && (
            <ImageSource 
              srcSet={typeof src.tablet === 'string' ? src.tablet : src.tablet.src}
              width={typeof src.tablet === 'object' ? src.tablet.width : undefined}
              height={typeof src.tablet === 'object' ? src.tablet.height : undefined}
              media={`(max-width: ${theme.tablet.maxWidth})`}
              onLoad={handleLoad as unknown as React.ReactEventHandler<HTMLSourceElement>}  
            />
          )}
          {src.desktop && (
            <ImageImg
              $hidden={isHidden}
              src={typeof src.desktop === 'string' ? src.desktop : src.desktop.src}
              width={typeof src.desktop === 'object' ? src.desktop.width : undefined}
              height={typeof src.desktop === 'object' ? src.desktop.height : undefined}
              alt={alt} 
              onLoad={handleLoad}
            />
          )}
        </ImagePicture>
      )}
      {preload 
      && (
        <Helmet>
          {typeof src === 'string' && (
            <link rel="preload" href={src} as="image" fetchPriority={fetchPriority} />
          )}
          {(typeof src === 'object' && src.mobile) && (
            <link 
              rel="preload" 
              href={typeof src.mobile === 'string' ? src.mobile : src.mobile.src}
              as="image"
              media={`(max-width: ${theme.mobile.maxWidth})`} 
              fetchPriority={fetchPriority}
            />
          )}
          {(typeof src === 'object' && src.tablet) && (
            <link 
              rel="preload" 
              fetchPriority={fetchPriority}
              href={typeof src.tablet === 'string' ? src.tablet : src.tablet.src}
              as="image" 
              media={`(min-width: ${parseInt(theme.mobile.maxWidth) + 0.1}px) and (max-width: ${theme.tablet.maxWidth})`}
            />
          )}
          {(typeof src === 'object' && src.desktop) && (
            <link 
              rel="preload"
              fetchPriority={fetchPriority}
              href={typeof src.desktop === 'string' ? src.desktop : src.desktop.src}
              as="image"
              media={`(min-width: ${parseInt(theme.tablet.maxWidth) + 0.1}px)`}
            />
          )}
        </Helmet>
      )}
    </>
  );
});

export * from './types';
export * from './styled';
