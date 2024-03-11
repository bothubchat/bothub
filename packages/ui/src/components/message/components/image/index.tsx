import React, { useEffect, useState } from 'react';
import { MessageImageNative, MessageImageSkeleton, MessageImageStyled } from './styled';
import { ImageProps } from '@/ui/components/image';
import { MessageImageProvider } from './context';
import { useTheme } from '@/ui/theme';
import { useMessage } from '@/ui/components/message/context';

export interface MessageImageProps extends Omit<ImageProps, 'ref'> {
  src: string;
  width: number;
  height: number;
  clickable?: boolean;
  progress?: boolean;
  fetchImage?: boolean;
  buttons?: React.ReactNode;
}

export const MessageImage: React.FC<MessageImageProps> = ({
  className, src, width, height, buttons, 
  clickable = false, progress = false, fetchImage = false, 
  ...props
}) => {
  const theme = useTheme();
  const { variant } = useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (fetchImage) {
      fetch(src)
        .then((response) => response.blob())
        .then((image) => (
          setImageUrl(URL.createObjectURL(image))
        ));
    }
  }, [src]);

  return (
    <MessageImageProvider
      width={width}
      height={height}
    >
      <MessageImageStyled
        className={className}
      >
        {isLoading && (
          <MessageImageSkeleton
            $width={width}
            $height={height}
            opacity={[
              theme.mode === 'light' ? 0.1 : 0.15,
              theme.mode === 'light' ? 0.225 : 0.35
            ]}
            colors={[
              variant === 'user' ? theme.colors.base.white : (
                theme.mode === 'light' ? theme.default.colors.base.black : theme.colors.grayScale.gray6
              )
            ]}
          />
        )}
        <MessageImageNative
          $clickable={clickable}
          $progress={progress}
          $loading={isLoading}
          {...props}
          {...((fetchImage && imageUrl) && {
            src: imageUrl
          })}
          {...(!fetchImage && { src })}
          width={width}
          height={height}
          onLoad={setIsLoading.bind(null, false)}
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
