import React from 'react';
import defaultAvatar from './assets/default-avatar.png';
import botAvatar from './assets/bot-avatar.png';
import {
  AvatarImage, AvatarObject, AvatarSkeleton, AvatarStyled 
} from './styled';
import { AvatarVariant } from './types';

export interface AvatarProps extends React.ComponentProps<'img'> {
  variant?: AvatarVariant;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  className, style, variant = 'my', size = 40, src, alt, children
}) => {
  const isSkeleton = React.isValidElement(children) && (children.type as React.FC).displayName === 'Skeleton';

  switch (variant) {
    case 'my':
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
      $size={size}
      className={className}
      style={style}
    >
      {!isSkeleton && (
        <AvatarObject
          data={src}
          width={40}
          height={40}
        >
          <AvatarImage
            src={defaultAvatar}
            width={40}
            height={40}
            alt={alt}
          />
        </AvatarObject>
      )}
      {isSkeleton && (
        <AvatarSkeleton />
      )}
    </AvatarStyled>
  );
};

export * from './types';
