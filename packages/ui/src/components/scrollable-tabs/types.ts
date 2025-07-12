import { ReactNode } from 'react';

export type ITab = {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
};

export type Variant = 'primary' | 'secondary';

export type ScrollableTabsProps = {
  tabs: ITab[];
  variant?: Variant;
  component?: 'a' | 'button';
  selectedTab?: string;
  defaultTabId?: string;
  fullWidth?: boolean;
  notNullable?: boolean;
  onClick?(id: string | null): unknown;
};
