/* eslint-disable react/no-unknown-property */
import React, { LinkHTMLAttributes } from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../theme';
import { ImageImg, ImagePicture, ImageSource } from './styled';

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

export interface ImageProps extends Omit<React.ComponentProps<'img'>, 'src' | 'alt' | 'width' | 'height'> {
  src?: string | ImageSrc;
  width?: string | number;
  height?: string | number;
  alt?: string;
  preload?: boolean;
  fetchPriority?: LinkHTMLAttributes<HTMLLinkElement>['fetchPriority'];
}

export const Image: React.FC<ImageProps> = ({
  src, alt, width, height, preload = false, fetchPriority, ...props 
}) => {
  const theme = useTheme();

  return (
    <>
      {typeof src === 'string' && (
        <ImageImg {...props} src={src} width={width} height={height} alt={alt} />
      )}
      {typeof src === 'object' && (
        <ImagePicture {...props}>
          {src.mobile && (
            <ImageSource 
              srcSet={typeof src.mobile === 'string' ? src.mobile : src.mobile.src}
              width={typeof src.mobile === 'object' ? src.mobile.width : undefined}
              height={typeof src.mobile === 'object' ? src.mobile.height : undefined}
              media={`(max-width: ${theme.mobile.maxWidth})`} 
            />
          )}
          {src.tablet && (
            <ImageSource 
              srcSet={typeof src.tablet === 'string' ? src.tablet : src.tablet.src}
              width={typeof src.tablet === 'object' ? src.tablet.width : undefined}
              height={typeof src.tablet === 'object' ? src.tablet.height : undefined}
              media={`(max-width: ${theme.tablet.maxWidth})`} 
            />
          )}
          {src.desktop && (
            <ImageImg 
              src={typeof src.desktop === 'string' ? src.desktop : src.desktop.src}
              width={typeof src.desktop === 'object' ? src.desktop.width : undefined}
              height={typeof src.desktop === 'object' ? src.desktop.height : undefined}
              alt={alt}  
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
};

export * from './styled';
