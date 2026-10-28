export type PaginatorProps = {
  current: number | null;
  onChange(page: number): void;
  lastPage: number;
  arrowStyles?: 'default' | 'caret';
  'aria-label'?: string;
  prevPageAriaLabel?: string;
  nextPageAriaLabel?: string;
};
