export type TMenuItem = {
  accordion_title: string;
  first_level?: TFirstLevelItem[];
};

export type TFirstLevelItem = {
  title: string;
  path: string;
  icon: JSX.Element | string;
  description?: string;
  children?: TFirstLevelItem[];
};
