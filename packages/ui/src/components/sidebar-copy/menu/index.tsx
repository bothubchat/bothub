import { useCallback, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { MenuIcon } from '@/ui/icons/menu';
import { SidebarMenuStyled, SidebarMenuList } from './styled';
import { useSidebar } from '../context';

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isOpen: sidebarOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const menuTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      scale: 0.85,
    },
    enter: {
      opacity: 1,
      scale: 1,
    },
    leave: {
      opacity: 0,
      scale: 0.85,
    },
    config: { duration: 150 },
  });

  return (
    <SidebarMenuStyled ref={sidebarRef}>
      <Button
        size="small"
        onClick={handleToggle}
      >
        {isOpen && <CloseIcon />}
        {!isOpen && <MenuIcon />}
      </Button>
      {menuTransition(
        (style, item) =>
          item && (
            <SidebarMenuList
              $isOpen={sidebarOpen}
              style={style}
            >
              {children}
            </SidebarMenuList>
          ),
      )}
    </SidebarMenuStyled>
  );
};

export * from './item';
