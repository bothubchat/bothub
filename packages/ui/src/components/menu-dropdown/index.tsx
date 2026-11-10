import { useState, useCallback, useRef } from 'react';
import { useTransition } from '@react-spring/web';
import { MenuIcon } from '@/ui/icons/menu';
import { CloseIcon } from '@/ui/icons/close';
import { useOnClickOutside } from '@/ui/utils';
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
    setIsOpen((prev) => !prev);
  }, []);

  const Icon = isOpen ? CloseIcon : MenuIcon;

  // Listen for outside clicks only while the dropdown is open
  useOnClickOutside(menuDropdownRef, () => setIsOpen(false), isOpen);

  const dropdownTransition = useTransition(isOpen, {
    from: { scale: 0.85, opacity: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { scale: 0.85, opacity: 0 },
    config: { duration: 135 },
  });

  return (
    <MenuDropdownProvider
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <MenuDropdownStyled
        {...props}
        ref={menuDropdownRef}
      >
        <MenuDropdownToggleButton
          disabled={disabled}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <Icon />
        </MenuDropdownToggleButton>
        {dropdownTransition(
          (style, item) =>
            item && (
              <MenuDropdownBlock style={style}>
                <MenuDropdownBlockScrollbarWrapper>
                  <MenuDropdownBlockContent>
                    {children}
                  </MenuDropdownBlockContent>
                </MenuDropdownBlockScrollbarWrapper>
              </MenuDropdownBlock>
            ),
        )}
      </MenuDropdownStyled>
    </MenuDropdownProvider>
  );
};
