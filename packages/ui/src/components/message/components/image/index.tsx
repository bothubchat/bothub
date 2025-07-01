import React, { useEffect, useState } from 'react';
import {
  MessageImageNative,
  MessageImageSkeleton,
  MessageImageStyled
} from './styled';
import { ImageProps } from '@/ui/components/image';
import { MessageImageProvider } from './context';
import { useTheme } from '@/ui/theme';
import { useMessage } from '@/ui/components/message/context';
import { getImageOrientation, getTransformStyle } from './lib/utils';

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
  style,
  ...props
}) => {
  const theme = useTheme();
  const { variant } = useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const loadImage = async () => {
      try {
        let blob: Blob;

        if (fetchImage) {
          const response = await fetch(src);
          blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setImageUrl(blobUrl);
        } else {
          const response = await fetch(src);
          blob = await response.blob();
        }
        const orientation = await getImageOrientation(blob);
        const transform = getTransformStyle(orientation);
        setTransformStyle(transform);
      } catch (error) {
        console.error('Error loading image:', error);
        if (!fetchImage) {
          setImageUrl(null);
        }
      }
    };

    loadImage();
  }, [src, fetchImage]);

  useEffect(
    () => () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    },
    [imageUrl]
  );

  const finalStyle = {
    ...style,
    ...transformStyle,
    imageOrientation: 'from-image' as const
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
              theme.mode === 'light' ? 0.225 : 0.35
            ]}
            colors={[
              variant === 'user'
                ? theme.colors.base.white
                : theme.mode === 'light'
                  ? theme.default.colors.base.black
                  : theme.colors.grayScale.gray6
            ]}
          />
        )}
        <MessageImageNative
          $clickable={clickable}
          $progress={progress}
          $loading={isLoading && !disableSkeleton}
          {...props}
          style={finalStyle}
          src={imageUrl || src}
          width={width ?? 300}
          height={height ?? 300}
          onLoad={() => setIsLoading(false)}
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
