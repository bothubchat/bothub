import React from 'react';
import botAvatar from './assets/bot-avatar.png';
import { AvatarBg, AvatarObject, AvatarSkeleton, AvatarStyled } from './styled';
import { AvatarVariant } from './types';
import { IconProvider } from '../icon';
import { UserProfileIcon } from '@/ui/icons';

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
  children,
  ...props
}) => {
  const isChildren = React.isValidElement(children);
  const isSkeleton =
    isChildren && (children.type as React.FC).displayName === 'Skeleton';

  switch (variant) {
    case 'bot':
      src = botAvatar;
      break;
  }

  return src ? (
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
        />
      )}
      {isChildren && !isSkeleton && (
        <IconProvider size={size}>{children}</IconProvider>
      )}
      {isSkeleton && <AvatarSkeleton />}
    </AvatarStyled>
  ) : (
    <AvatarBg $size={size}>
      {!isSkeleton && !isChildren && (
        <IconProvider size={size / 2}>
          <UserProfileIcon />
        </IconProvider>
      )}

      {isSkeleton && <AvatarSkeleton />}
    </AvatarBg>
  );
};

export * from './types';
