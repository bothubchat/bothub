import React from 'react';
import alri from './assets/alri.webp';
import { ImageProps } from '@/ui/components/image';

export type AlriIconProps = Omit<ImageProps, 'src' | 'alt' | 'loading'> & {
  alt: string;
};

/*
 * A raster logo: the 2.4 KB webp is inlined as a 3.2 KB data URI (there is no
 * vector source to trace it from). It is only in the bundles that render
 * AlriIcon, the module imports nothing else.
 */
export const AlriIcon: React.FC<AlriIconProps> = ({ alt, ...props }) => (
  <img
    {...props}
    width={87}
    height={53}
    src={alri}
    alt={alt}
  />
);
