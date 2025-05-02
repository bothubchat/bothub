import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarDropdownContent,
  SidebarDropdownList,
  SidebarDropdownStyled,
  SidebarDropdownToggler,
  SidebarDropdownTogglerIcon
} from './styled';
import { SidebarDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export interface SidebarDropdownProps
  extends React.ComponentProps<typeof SidebarDropdownStyled> {}

export const SidebarListActions: React.FC<SidebarDropdownProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', clickListener, true);

      return () => {
        document.removeEventListener('click', clickListener, true);
      };
    }
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && contentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = buttonRef.current?.parentElement?.getBoundingClientRect();
      const menuRect = contentRef.current.getBoundingClientRect();
      if (!containerRect) return;
      const spaceBelow = containerRect.bottom - buttonRect.bottom;
      const spaceAbove = buttonRect.top - containerRect.top;

      if (menuRect.height > spaceBelow && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);


  const dropdownParent = dropdownRef.current?.parentElement?.parentElement;

  const [parentHeight, parentScrollHeight] = [ dropdownParent?.offsetHeight, dropdownParent?.scrollHeight];
  const reverse = parentHeight! < parentScrollHeight!

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0.0)',
      visability: 'hidden'
    },
    enter: {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transform: `scale(1)`,
      transition: {
        duration: 150
      }
    },
    leave: {
      opacity: 0,
      visability: 'hidden',
      transform: 'scale(0.999)'
    },
    config: {
      delay: 100,
      duration: 200
    }
  });

  return (
    <SidebarDropdownProvider setIsOpen={setIsOpen}>
      <SidebarDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <SidebarDropdownToggler ref={buttonRef} onClick={handleToggle}>
          <IconProvider fill={theme.colors.base.white}>
            <SidebarDropdownTogglerIcon />
          </IconProvider>
        </SidebarDropdownToggler>
        {dropdownTransition(
          (style, item) =>
            item && (
              <SidebarDropdownContent
                ref={contentRef}
                style={{
                  ...style,
                  top: 0,
                  transform: openUpward ? 'translate3d(-100%, -100%, 0)' : 'translate3d(-100%, 0, 0)',
                }}
              >
                <SidebarDropdownList>
                  {children}
                </SidebarDropdownList>
              </SidebarDropdownContent>
            )
        )}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export { SidebarDropdownItem } from './item';
