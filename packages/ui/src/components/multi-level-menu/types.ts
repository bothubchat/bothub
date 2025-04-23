import { IconComponent } from '..';

export type TMenuItem = {
  accordion_title: string;
  children?: TFirstLevelItem[];
};

export type TFirstLevelItem = {
  title: string;
  path?: string;
  icon?: IconComponent | string;
  description?: string;
  sub_title?: string;
  children?: TFirstLevelItem[];
};
