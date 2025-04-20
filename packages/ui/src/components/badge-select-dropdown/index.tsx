import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  BadgeSelectDropdownWrapper,
  BadgeSelectDropdownTrigger,
  BadgeSelectDropdownSpanStyled,
  BadgeSelectDropdownTogglerArrow,
  BadgeSelectDropdownList
} from './styled';
import { BadgeSelectDropdownProvider } from './context';

interface IBadgeSelectDropdown {
  activeDropDownItem: string;
  children: React.ReactNode;
}

export const BadgeSelectDropdown: React.FC<IBadgeSelectDropdown> = ({
  children,
  activeDropDownItem
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)'
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`
    },
    leave: { opacity: 0, transform: 'scale(0.999)' },
    config: { duration: 150 }
  });

  return (
    <BadgeSelectDropdownProvider setIsOpen={setIsOpen}>
      <BadgeSelectDropdownWrapper ref={dropdownRef}>
        <BadgeSelectDropdownTrigger
          $active={isOpen}
          onClick={handleToggle}
          type="button"
        >
          <BadgeSelectDropdownSpanStyled>
            {activeDropDownItem}
          </BadgeSelectDropdownSpanStyled>
          <BadgeSelectDropdownTogglerArrow $open={isOpen} />
        </BadgeSelectDropdownTrigger>
        {dropdownTransition(
          (style, item) =>
            item && (
              <BadgeSelectDropdownList
                $open={isOpen && !!item}
                style={style}
              >
                {children}
              </BadgeSelectDropdownList>
            )
        )}
      </BadgeSelectDropdownWrapper>
    </BadgeSelectDropdownProvider>
  );
};

export * from './item';
export * from './styled';
export * from './context';
