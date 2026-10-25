import React, { useEffect, useState } from 'react';
import {
  MessageImageNative,
  MessageImageSkeleton,
  MessageImageStyled,
} from './styled';
import { ImageProps } from '@/ui/components/image';
import { MessageImageProvider } from './context';
import { useTheme } from '@/ui/theme';
import { useMessage } from '@/ui/components/message/context';

export interface MessageImageProps extends Omit<ImageProps, 'ref'> {
  src: string;
  width?: number;
  height?: number;
  clickable?: boolean;
  progress?: boolean;
  fetchImage?: boolean;
  disableSkeleton?: boolean;
  buttons?: React.ReactNode;
}

export const MessageImage: React.FC<MessageImageProps> = ({
  className,
  src,
  width,
  height,
  buttons,
  clickable = false,
  progress = false,
  fetchImage = false,
  disableSkeleton = false,
  alt = '',
  onLoad,
  onError,
  ...props
}) => {
  const theme = useTheme();
  const { variant } = useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prevSrc, setPrevSrc] = useState(src);

  // A new image shows the skeleton until it loads, never the previous one.
  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoading(true);
    setImageUrl(null);
  }

  useEffect(() => {
    if (!fetchImage) {
      return;
    }

    // The response of a previous src or of an unmounted image is dropped,
    // and its blob URL is revoked.
    let cancelled = false;
    let objectUrl: string | null = null;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        return response.blob();
      })
      .then((image) => {
        if (cancelled) {
          return;
        }
        objectUrl = URL.createObjectURL(image);
        setImageUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src, fetchImage]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onError?.(event);
  };

  return (
    <MessageImageProvider
      width={width}
      height={height}
    >
      <MessageImageStyled className={className}>
        {isLoading && !disableSkeleton && (
          <MessageImageSkeleton
            $width={width ?? 300}
            $height={height ?? 300}
            opacity={[
              theme.mode === 'light' ? 0.1 : 0.15,
              theme.mode === 'light' ? 0.225 : 0.35,
            ]}
            colors={[
              variant === 'user'
                ? theme.colors.base.white
                : theme.mode === 'light'
                  ? theme.default.colors.base.black
                  : theme.colors.grayScale.gray6,
            ]}
          />
        )}
        <MessageImageNative
          $clickable={clickable}
          $progress={progress}
          $loading={isLoading && !disableSkeleton}
          alt={alt}
          {...props}
          {...(fetchImage &&
            imageUrl && {
              src: imageUrl,
            })}
          {...(!fetchImage && { src })}
          width={width ?? 300}
          height={height ?? 300}
          onLoad={handleLoad}
          onError={handleError}
        />
        {!progress && buttons}
      </MessageImageStyled>
    </MessageImageProvider>
  );
};

export * from './styled';
export * from './grid';
export * from './button';
export * from './context';
