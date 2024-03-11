import React from 'react';
import defaultAvatar from './assets/default-avatar.png';
import botAvatar from './assets/bot-avatar.png';
import {
  AvatarImage, AvatarObject, AvatarSkeleton, AvatarStyled 
} from './styled';
import { AvatarVariant } from './types';
import { IconProvider } from '../icon';

export interface AvatarProps extends React.ComponentProps<'img'> {
  variant?: AvatarVariant;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  className, style, variant = 'user', size = 40, src, alt, children, ...props
}) => {
  const isChildren = React.isValidElement(children);
  const isSkeleton = isChildren && (children.type as React.FC).displayName === 'Skeleton';

  switch (variant) {
    case 'user':
      if (!src) {
        src = defaultAvatar;
      }
      break;
    case 'default':
      src = defaultAvatar;
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
      {(!isSkeleton && !isChildren) && (
        <AvatarObject
          data={src}
          width={size}
          height={size}
        >
          <AvatarImage
            src={defaultAvatar}
            width={size}
            height={size}
            alt={alt}
          />
        </AvatarObject>
      )}
      {(isChildren && !isSkeleton) && (
        <IconProvider
          size={size}
        >
          {children}
        </IconProvider>
      )}
      {isSkeleton && (
        <AvatarSkeleton />
      )}
    </AvatarStyled>
  );
};

export * from './types';
