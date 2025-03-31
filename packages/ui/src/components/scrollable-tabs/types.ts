import { ReactNode } from 'react';

export type ITab = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
};

export type Variant = 'primary' | 'secondary';
