import * as S from './styled';
import { PaginatorProps } from './types';
import { emptySpace, usePaginatorPages } from './utils';

export const Paginator = ({
  current,
  onChange,
  lastPage,
  arrowStyles = 'default',
  'aria-label': ariaLabel,
  prevPageAriaLabel,
  nextPageAriaLabel,
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
    <S.Container
      role="navigation"
      aria-label={ariaLabel}
    >
      <S.ControlButton
        $disabled={lastPage === 1}
        aria-disabled={lastPage === 1 || undefined}
        aria-label={prevPageAriaLabel}
        onClick={handlePrevPage}
      >
        {arrowStyles === 'caret' ? <S.ArrowCaretIcon /> : <S.ArrowIcon />}
      </S.ControlButton>
      {pages.map((page) => (
        <S.PaginatorItem
          key={page.id}
          $active={page.value === current}
          $disabled={page.value === emptySpace || page.value === current}
          aria-current={page.value === current ? 'page' : undefined}
          {...(page.value === emptySpace && {
            tabIndex: -1,
            'aria-hidden': true,
          })}
          onClick={
            typeof page.value === 'number'
              ? changePage.bind(null, page.value)
              : () => {}
          }
        >
          {page.value}
        </S.PaginatorItem>
      ))}
      <S.ControlButton
        $disabled={lastPage === 1}
        aria-disabled={lastPage === 1 || undefined}
        aria-label={nextPageAriaLabel}
        onClick={handleNextPage}
      >
        {arrowStyles === 'caret' ? (
          <S.ArrowCaretNextIcon />
        ) : (
          <S.ArrowNextIcon />
        )}
      </S.ControlButton>
    </S.Container>
  );
};
