import { ReactNode } from 'react';

export type ITab = {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
};

export type Variant = 'primary' | 'secondary';
