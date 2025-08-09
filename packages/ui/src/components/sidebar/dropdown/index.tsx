import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarDropdownContent,
  SidebarDropdownStyled,
  SidebarDropdownToggler,
  SidebarDropdownTogglerIcon,
} from './styled';
import { SidebarDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { Portal } from '@/ui/components/portal';
import { useTheme } from '@/ui/theme';
import { isBright } from '@/ui/utils';

export interface SidebarDropdownProps
  extends React.ComponentProps<typeof SidebarDropdownStyled> {}

export const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener, true);
      window.addEventListener('blur', blurListener, true);

      return () => {
        document.removeEventListener('click', clickListener, true);
        window.removeEventListener('blur', blurListener, true);
      };
    }
  }, []);

  const contentPosition = dropdownRef.current?.getBoundingClientRect() ?? {
    right: 0,
    bottom: 0,
  };

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 150,
    },
  });

  return (
    <SidebarDropdownProvider setIsOpen={setIsOpen}>
      <SidebarDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <IconProvider
          fill={
            isBright(theme.colors.grayScale.gray4)
              ? theme.default.colors.base.black
              : theme.default.colors.base.white
          }
        >
          <SidebarDropdownToggler
            $open={isOpen}
            onClick={handleToggle}
          >
            <SidebarDropdownTogglerIcon />
          </SidebarDropdownToggler>
        </IconProvider>
        <Portal>
          {dropdownTransition(
            (style, item) =>
              item && (
                <SidebarDropdownContent
                  ref={contentRef}
                  style={{
                    ...style,
                    left: contentPosition.right,
                    top: contentPosition.bottom,
                  }}
                >
                  {children}
                </SidebarDropdownContent>
              ),
          )}
        </Portal>
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export * from './styled';
export * from './item';
