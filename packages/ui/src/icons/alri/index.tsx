import React from 'react';
import alri from './assets/alri.webp';
import { ImageProps } from '@/ui/components/image';

export type AlriIconProps = Omit<ImageProps, 'src' | 'alt' | 'loading'> & {
  alt: string;
};

export const AlriIcon: React.FC<AlriIconProps> = ({ alt, ...props }) => (
  <img {...props} width={87} height={53} src={alri} alt={alt} />
);
