import React from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../theme';
import { ImageImg, ImagePicture, ImageSource } from './styled';

export interface ImageSrc {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}


export interface ImageProps extends Omit<React.ComponentProps<'img'>, 'src' | 'alt'> {
  src: string | ImageSrc;
  alt: string;
};

export const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  const theme = useTheme();

  return (
    <>
      {typeof src === 'string' && (
        <ImageImg {...props} src={src} alt={alt} />
      )}
      {typeof src !== 'string' && (
        <ImagePicture {...props}>
          {src.mobile && (
            <ImageSource 
              srcSet={src.mobile} 
              media={`(max-width: ${theme.mobile.maxWidth})`} 
            />
          )}
          {src.tablet && (
            <ImageSource 
              srcSet={src.tablet} 
              media={`(max-width: ${theme.tablet.maxWidth})`} 
            />
          )}
          <ImageImg 
            src={src.desktop ?? src.tablet ?? src.mobile}
            alt={alt}  
          />
        </ImagePicture>
      )}
      <Helmet>
        {typeof src === 'string' && (
          <link rel="preload" href={src} as="image" />
        )}
        {(typeof src !== 'string' && src.mobile) && (
          <link 
            rel="preload" 
            href={src.mobile}
            as="image"
            media={`(max-width: ${theme.mobile.maxWidth})`} 
          />
        )}
        {(typeof src !== 'string' && src.tablet) && (
          <link 
            rel="preload" 
            href={src.tablet}
            as="image" 
            media={`(min-width: ${parseInt(theme.mobile.maxWidth) + 0.1}px) and (max-width: ${theme.tablet.maxWidth})`}
          />
        )}
        {(typeof src !== 'string' && src.desktop) && (
          <link 
            rel="preload"
            href={src.desktop}
            as="image"
            media={`(min-width: ${parseInt(theme.tablet.maxWidth) + 0.1}px)`}
          />
        )}
      </Helmet>
    </>
  );
}

export * from './styled';
