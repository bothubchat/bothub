import { IconComponent } from '@/ui/components/icon';

export type TMenuItem = {
  accordion_title: string;
  linkIcon_hidden?: boolean;
  children?: TFirstLevelItem[];
};

export type TFirstLevelItem = {
  title: string;
  path?: string;
  onClick?: () => void;
  index?:number
  icon?: IconComponent | string;
  description?: string;
  sub_title?: string;
  children?: TFirstLevelItem[];
};
