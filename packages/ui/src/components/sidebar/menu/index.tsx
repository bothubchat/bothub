import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarMenuBlock, 
  SidebarMenuBlockContent, 
  SidebarMenuBlockScrollbarWrapper, 
  SidebarMenuStyled, 
  SidebarMenuToggleButton 
} from './styled';
import { CloseIcon } from '@/ui/icons/close';
import { MenuIcon } from '@/ui/icons/menu';
import { SidebarMenuProvider } from './context';

export type SidebarMenuProps = React.ComponentProps<'div'> & {
  disabled?: boolean;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  children, disabled = false, ...props
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const clickListener = (event: Event) => {
      const sidebarEl: HTMLDivElement | null = sidebarRef.current;
      
      if (sidebarEl === null) {
        return;
      }
      if (sidebarEl.contains(event.target as Element)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  const menuTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0.85)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.85)',
    },
    config: { duration: 135 }
  });

  return (
    <SidebarMenuProvider
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <SidebarMenuStyled
        {...props}
        ref={sidebarRef}
      >
        <SidebarMenuToggleButton
          disabled={disabled}
          onClick={handleToggle}
        >
          {isOpen && <CloseIcon />}
          {!isOpen && <MenuIcon />}
        </SidebarMenuToggleButton>
        {menuTransition((style, item) => item && (
          <SidebarMenuBlock style={style}>
            <SidebarMenuBlockScrollbarWrapper>
              <SidebarMenuBlockContent>
                {children}
              </SidebarMenuBlockContent>
            </SidebarMenuBlockScrollbarWrapper>
          </SidebarMenuBlock>
        ))}
      </SidebarMenuStyled>
    </SidebarMenuProvider>
  );
};

export * from './styled';
export * from './context';
export * from './nav';
