import {
  useState, useCallback, useRef, useEffect 
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTransition } from '@react-spring/web';
import { MenuIcon, CloseIcon } from '@/ui/icons';
import { MenuDropdownProvider } from './context';
import {
  MenuDropdownBlock,
  MenuDropdownBlockContent,
  MenuDropdownBlockScrollbarWrapper,
  MenuDropdownStyled,
  MenuDropdownToggleButton,
} from './styled';

export type MenuDropdownProps = React.ComponentProps<'div'> & {
  disabled?: boolean;
  $isAdmin?: boolean;
};

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  children,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const Icon = isOpen ? CloseIcon : MenuIcon;

  useEffect(() => {
    const clickListener = (event: Event) => {
      const menuDropdownEl: HTMLDivElement | null = menuDropdownRef.current;

      if (menuDropdownEl === null) {
        return;
      }
      if (menuDropdownEl.contains(event.target as Element)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  const dropdownTransition = useTransition(isOpen, {
    from: { scale: 0.85, opacity: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { scale: 0.85, opacity: 0 },
    config: { duration: 135 }
  });

  return (
    <MenuDropdownProvider isOpen={isOpen} setIsOpen={setIsOpen}>
      <MenuDropdownStyled {...props} ref={menuDropdownRef}>
        <MenuDropdownToggleButton disabled={disabled} onClick={handleToggle}>
          <Icon />
        </MenuDropdownToggleButton>
        <AnimatePresence>
          {dropdownTransition(
            (style, item) => item && (
              <MenuDropdownBlock style={style}>
                <MenuDropdownBlockScrollbarWrapper>
                  <MenuDropdownBlockContent>
                    {children}
                  </MenuDropdownBlockContent>
                </MenuDropdownBlockScrollbarWrapper>
              </MenuDropdownBlock>
            )
          )}
        </AnimatePresence>
      </MenuDropdownStyled>
    </MenuDropdownProvider>
  );
};
