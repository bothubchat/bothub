import { ReactNode } from 'react';

export type ITabLink = {
  href: string;
};

export type ITabButton = {
  onClick(id: string): void;
};

export type ITab = {
  id: string;
  label: string;
  icon?: ReactNode;
} & (ITabLink | ITabButton);

export type Variant = 'primary' | 'secondary';
