import { useCallback } from 'react';
import * as S from './styled';
import { PaginatorProps } from './types';
import { emptySpace, usePaginatorPages } from './utils';

export const Paginator = ({
  current,
  onChange,
  lastPage,
}: PaginatorProps) => {
  const pages = usePaginatorPages(current ?? 1, lastPage);
  
  const changePage = useCallback((page: number) => {
    onChange(page);
  }, [onChange]);
  
  const handlePrevPage = useCallback(() => {
    if (!current || current <= 1) {
      onChange(lastPage);
    } else {
      onChange(current - 1);
    }
  }, [current, onChange, lastPage]);
  
  const handleNextPage = useCallback(() => {
    if (!current || current >= lastPage) {
      onChange(1);
    } else {
      onChange(current + 1);
    }
  }, [current, onChange, lastPage]);

  return (
    <S.Container>
      <S.ControlButton $disabled={lastPage === 1} onClick={handlePrevPage}>
        <S.ArrowIcon />
      </S.ControlButton>
      {pages.map((page) => (
        <S.PaginatorItem
          key={page.id}
          $active={page.value === current}
          $disabled={page.value === emptySpace || page.value === current}
          onClick={changePage.bind(null, page.value as number)}
        >
          {page.value}
        </S.PaginatorItem>
      ))}
      <S.ControlButton $disabled={lastPage === 1} onClick={handleNextPage}>
        <S.ArrowNextIcon />
      </S.ControlButton>
    </S.Container>
  );
};
