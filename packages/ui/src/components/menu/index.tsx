import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { findNearestScrollableParent } from '@/ui/utils';
import { Button, ButtonProps } from '../button';
import { Portal } from '../portal';
import * as S from './styled';
import { MenuPosition } from './types';
import { getMenuCoords, MenuCoords } from './utils/getMenuCoords';

export type { MenuPosition } from './types';

type BaseMenuProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  buttonLabel?: string;
  buttonProps?: Omit<ButtonProps, 'children' | 'onClick'>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnContentClick?: boolean;
  closeOnScroll?: boolean;
  position?: MenuPosition;
  offset?: number;
  viewportPadding?: number;
  flip?: boolean;
  matchTriggerWidth?: boolean;
  disablePortal?: boolean;
  className?: string;
};

export type MenuProps = BaseMenuProps &
  Omit<React.ComponentProps<'div'>, keyof BaseMenuProps>;

const defaultCoords: MenuCoords = { top: 0, left: 0 };

export const Menu: React.FC<MenuProps> = ({
  children,
  trigger,
  buttonLabel = 'Меню',
  buttonProps,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnContentClick = false,
  closeOnScroll = true,
  position = 'left',
  offset = 8,
  viewportPadding = 8,
  flip = true,
  matchTriggerWidth = false,
  disablePortal = false,
  className,
  ...props
}) => {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [coords, setCoords] = useState<MenuCoords>(defaultCoords);
  const [contentVisible, setContentVisible] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const triggerId = useId();
  const contentId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const contentEl = contentRef.current;

    if (!triggerEl || !contentEl) return false;

    const triggerRect = triggerEl.getBoundingClientRect();
    // offsetWidth/offsetHeight — без влияния transform scale(0.98)
    const dropdownWidth = contentEl.offsetWidth;
    const dropdownHeight = contentEl.offsetHeight;

    if (dropdownWidth <= 0 || dropdownHeight <= 0) {
      return false;
    }

    const menuCoords = getMenuCoords({
      triggerRect,
      dropdownWidth,
      dropdownHeight,
      position,
      offset,
      viewportPadding,
      flip,
      matchTriggerWidth,
    });

    if (disablePortal && contentRef.current) {
      const contentOffsetParent = contentRef.current
        .offsetParent as HTMLElement | null;
      const offsetRect = contentOffsetParent?.getBoundingClientRect() ?? {
        top: 0,
        left: 0,
      };

      setCoords({
        top: menuCoords.top - offsetRect.top,
        left: menuCoords.left - offsetRect.left,
        ...(menuCoords.minWidth !== undefined && {
          minWidth: menuCoords.minWidth,
        }),
      });
    } else {
      setCoords(menuCoords);
    }

    return true;
  }, [
    disablePortal,
    flip,
    matchTriggerWidth,
    offset,
    position,
    viewportPadding,
  ]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setContentVisible(false);
      setCoords(defaultCoords);
      return;
    }

    setContentVisible(false);

    let frameId = 0;
    let attempts = 0;
    const maxAttempts = 5;

    const tryPosition = () => {
      attempts += 1;
      const positioned = updatePosition();

      if (positioned) {
        setContentVisible(true);
        return;
      }

      if (attempts < maxAttempts) {
        frameId = requestAnimationFrame(tryPosition);
      }
    };

    tryPosition();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    const observeTarget = measureRef.current ?? contentRef.current;
    resizeObserver.observe(observeTarget);

    if (contentRef.current && contentRef.current !== observeTarget) {
      resizeObserver.observe(contentRef.current);
    }

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target)) {
        return;
      }

      if (contentRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
      }
    };

    document.addEventListener('keyup', handleEscape, true);

    return () => {
      document.removeEventListener('keyup', handleEscape, true);
    };
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnScroll || !triggerRef.current) {
      return;
    }

    const scrollParent = findNearestScrollableParent(triggerRef.current);

    if (!scrollParent) {
      return;
    }

    const handleScroll = () => {
      setOpen(false);
    };

    scrollParent.addEventListener('scroll', handleScroll);

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll);
    };
  }, [closeOnScroll, isOpen, setOpen]);

  const handleTriggerClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      toggle();
    },
    [toggle],
  );

  const renderedTrigger = useMemo(() => {
    if (!trigger) {
      return null;
    }

    if (!React.isValidElement(trigger)) {
      return trigger;
    }

    const triggerElement = trigger as React.ReactElement<{
      onClick?: React.MouseEventHandler;
      id?: string;
      'aria-expanded'?: boolean;
      'aria-haspopup'?:
        | boolean
        | 'true'
        | 'false'
        | 'menu'
        | 'dialog'
        | 'listbox';
      'aria-controls'?: string;
    }>;

    const triggerOnClick = triggerElement.props.onClick;

    return React.cloneElement(triggerElement, {
      id: triggerElement.props.id ?? triggerId,
      'aria-expanded': isOpen,
      'aria-haspopup': true,
      'aria-controls': contentId,
      onClick: (event: React.MouseEvent) => {
        triggerOnClick?.(event);
        if (!event.defaultPrevented) {
          toggle();
        }
      },
    });
  }, [contentId, isOpen, toggle, trigger, triggerId]);

  const MenuPortalWrapper = disablePortal ? React.Fragment : Portal;

  const menuContent = isOpen ? (
    <S.MenuContent
      ref={contentRef}
      id={contentId}
      role="menu"
      $position={position}
      $disablePortal={disablePortal}
      $visible={contentVisible}
      style={{
        top: coords.top,
        left: coords.left,
        ...(coords.minWidth !== undefined && {
          minWidth: coords.minWidth,
        }),
      }}
      onClick={() => {
        if (closeOnContentClick) {
          setOpen(false);
        }
      }}
    >
      <S.MenuContentScrollbarWrapper>
        <S.MenuContentInner ref={measureRef}>{children}</S.MenuContentInner>
      </S.MenuContentScrollbarWrapper>
    </S.MenuContent>
  ) : null;

  return (
    <S.MenuRoot
      className={className}
      {...props}
    >
      <S.MenuTriggerWrapper ref={triggerRef}>
        {renderedTrigger ?? (
          <Button
            {...buttonProps}
            id={triggerId}
            aria-expanded={isOpen}
            aria-haspopup
            aria-controls={contentId}
            onClick={handleTriggerClick}
          >
            {buttonLabel}
          </Button>
        )}
      </S.MenuTriggerWrapper>

      {menuContent && <MenuPortalWrapper>{menuContent}</MenuPortalWrapper>}
    </S.MenuRoot>
  );
};
