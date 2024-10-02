import {
  useState, useCallback, useRef, useEffect 
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon } from '@/ui/icons';
import { MenuDropdownProvider } from './context';
import {
  MenuDropdownBlock, MenuDropdownBlockContent, MenuDropdownBlockScrollbarWrapper, MenuDropdownStyled, MenuDropdownToggleButton 
} from './styled';

export type MenuDropdownProps = React.ComponentProps<'div'> & {
  disabled?: boolean;
  $isAdmin?: boolean;
};

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  children, disabled = false, $isAdmin = false, ...props 
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

  return (
    <MenuDropdownProvider isOpen={isOpen} setIsOpen={setIsOpen}>
      <MenuDropdownStyled
        {...props}
        ref={menuDropdownRef}
      >
        <MenuDropdownToggleButton
          disabled={disabled}
          onClick={handleToggle}
        >
          <Icon />
        </MenuDropdownToggleButton>
        <AnimatePresence>
          {isOpen && (
            <MenuDropdownBlock
              variants={{
                open: {
                  scale: 1,
                  opacity: 1
                },
                close: {
                  scale: 0.85,
                  opacity: 0
                }
              }}
              initial="close"
              animate="open"
              exit="close"
              transition={{
                duration: 0.135
              }}
            >
              <MenuDropdownBlockScrollbarWrapper>
                <MenuDropdownBlockContent>
                  {children}
                </MenuDropdownBlockContent>
              </MenuDropdownBlockScrollbarWrapper>
            </MenuDropdownBlock>
          )}
        </AnimatePresence>
      </MenuDropdownStyled>
    </MenuDropdownProvider>
  );
};
