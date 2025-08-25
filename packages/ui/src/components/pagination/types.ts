export type PaginatorProps = {
  current: number | null;
  onChange(page: number): void;
  lastPage: number;
  arrowStyles?: 'default' | 'caret';
};
