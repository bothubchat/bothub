import React from 'react';
import defaultAvatar from './assets/default-avatar.png';
import defaultAvatarLight from './assets/default-avatar-light.png';
import botAvatar from './assets/bot-avatar.png';
import {
  AvatarImage,
  AvatarObject,
  AvatarSkeleton,
  AvatarStyled
} from './styled';
import { AvatarVariant } from './types';
import { IconProvider } from '../icon';
import { useTheme } from '@/ui/theme';

export interface AvatarProps extends React.ComponentProps<'img'> {
  variant?: AvatarVariant;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  style,
  variant = 'user',
  size = 40,
  src,
  alt,
  children,
  ...props
}) => {
  const theme = useTheme();
  const isChildren = React.isValidElement(children);
  const isSkeleton =
    isChildren && (children.type as React.FC).displayName === 'Skeleton';

  const defaultAvatarToUse =
    theme.mode === 'light' ? defaultAvatarLight : defaultAvatar;

  switch (variant) {
    case 'user':
      if (!src) {
        src = defaultAvatarToUse;
      }
      break;
    case 'default':
      src = defaultAvatarToUse;
      break;
    case 'bot':
      src = botAvatar;
      break;
  }

  return (
    <AvatarStyled
      {...props}
      $size={size}
      $children={isChildren}
      className={className}
      style={style}
    >
      {!isSkeleton && !isChildren && (
        <AvatarObject
          data={src}
          width={size}
          height={size}
        >
          <AvatarImage
            src={defaultAvatarToUse}
            width={size}
            height={size}
            alt={alt}
          />
        </AvatarObject>
      )}
      {isChildren && !isSkeleton && (
        <IconProvider size={size}>{children}</IconProvider>
      )}
      {isSkeleton && <AvatarSkeleton />}
    </AvatarStyled>
  );
};

export * from './types';
