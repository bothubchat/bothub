import { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import * as S from './styled';

export type BadgeSelectDropdownProps = {
  options: string[];
  value: string;
  onChange(value: string): void;
};

export const BadgeSelectDropdown = ({
  options,
  value,
  onChange
}: BadgeSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownTransition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: { duration: 150 }
  });

  useEffect(() => {
    const dropdownEl = dropdownRef.current;

    if (!dropdownEl) return;

    const blurListener = () => setIsOpen(false);

    const clickListener = (event: Event) => {
      if (!dropdownEl.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', clickListener);
    window.addEventListener('blur', blurListener);

    return () => {
      document.removeEventListener('click', clickListener);
      window.removeEventListener('blur', blurListener);
    };
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <S.BadgeSelectDropdownStyled ref={dropdownRef}>
      <S.BadgeSelectDropdownTrigger
        $active={isOpen}
        onClick={handleToggle}
        type="button"
      >
        <S.BadgeSelectDropdownSpanStyled>
          {value}
        </S.BadgeSelectDropdownSpanStyled>

        <S.BadgeSelectDropdownTogglerArrow $open={isOpen} />
      </S.BadgeSelectDropdownTrigger>

      {dropdownTransition(
        (style, item) =>
          item && (
            <S.BadgeSelectDropdownListWrapper style={style}>
              <S.BadgeSelectDropdownList $open={isOpen}>
                {options.map((option) => {
                  const onChangeHandler = () => {
                    setIsOpen(false);
                    onChange(option);
                  };

                  return (
                    <S.BadgeSelectDropdownListItemStyled
                      key={option}
                      onClick={onChangeHandler}
                      $active={option === value}
                    >
                      <S.BadgeSelectDropdownSpanStyled>
                        {option}
                      </S.BadgeSelectDropdownSpanStyled>
                    </S.BadgeSelectDropdownListItemStyled>
                  );
                })}
              </S.BadgeSelectDropdownList>
            </S.BadgeSelectDropdownListWrapper>
          )
      )}
    </S.BadgeSelectDropdownStyled>
  );
};

export * from './styled';
