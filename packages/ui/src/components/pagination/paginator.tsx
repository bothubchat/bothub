import * as S from './styled';
import { PaginatorProps } from './types';
import { emptySpace, usePaginatorPages } from './utils';

export const Paginator = ({
  current,
  onChange,
  lastPage,
}: PaginatorProps) => {
  const pages = usePaginatorPages(current ?? 1, lastPage);
  
  const changePage = (page: number) => {
    onChange(page);
  };
  
  const handlePrevPage = () => {
    if (!current || current <= 1) {
      onChange(lastPage);
    } else {
      onChange(current - 1);
    }
  };
  
  const handleNextPage = () => {
    if (!current || current >= lastPage) {
      onChange(1);
    } else {
      onChange(current + 1);
    }
  };

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
          onClick={typeof page.value === 'number' ? changePage.bind(null, page.value) : () => {}}
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
