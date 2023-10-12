import React, {
  useCallback, useRef, useState, useEffect
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollbarContent, ScrollbarShadows, ScrollbarStyled } from './styled';
import { ScrollbarLockedProps, ScrollbarShadowsProps, ScrollbarVariant } from './types';
import { ScrollbarProvider } from './context';

export interface ScrollbarProps extends React.PropsWithChildren {
  className?: string;
  scrollbarClassName?: string; 
  variant?: ScrollbarVariant;
  size?: number;
  scrollShadows?: ScrollbarShadowsProps;
  scrollLocked?: ScrollbarLockedProps;
  disableOverflowHidden?: boolean;
  disabled?: boolean;
}

export const Scrollbar: React.FC<ScrollbarProps> = ({ 
  className, scrollbarClassName, variant = 'primary', size = 6, scrollShadows, scrollLocked, disableOverflowHidden = false, disabled = false, children 
}) => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const advancedMode = !!scrollShadows;
  const lockedMode = !!scrollLocked;

  const handleScroll = useCallback(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
    if (scrollbarEl === null) {
      return;
    }

    const {
      scrollTop, scrollHeight, clientHeight,
      scrollLeft, scrollWidth, clientWidth
    } = scrollbarEl;

    setIsLeft(scrollLeft !== 0);
    setIsRight(scrollLeft < scrollWidth - clientWidth);
    setIsTop(scrollTop !== 0);
    setIsBottom(scrollTop < scrollHeight - clientHeight);
  }, [scrollbarRef]);

  const lockScroll = useCallback(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
    if (scrollbarEl === null) {
      return;
    }

    if (lockedMode && scrollbarEl !== null) {
      const { side } = scrollLocked;

      switch (side) {
        case 'bottom':
          if (scrollbarEl.scrollTop === 0) {
            scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
          } else {
            scrollbarEl.scrollTo({
              top: scrollbarEl.scrollHeight,
              behavior: 'smooth'
            });
          }
          break;
      }
    }
  }, [lockedMode, scrollLocked]);
  
  useEffect(() => {
    lockScroll();
  }, [children, lockScroll]);

  useEffect(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
    if (scrollbarEl === null) {
      return;
    }

    handleScroll();

    const observer = new MutationObserver(() => {
      handleScroll();
    });
    observer.observe(scrollbarEl, {
      childList: true,
      subtree: true
    });

    const resizeListener = () => handleScroll();
    window.addEventListener('resize', resizeListener);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeListener);
    };
  }, [scrollbarRef.current]);

  const contentNode: React.ReactNode = (
    <ScrollbarContent
      $variant={variant}
      $size={size}
      $disabled={disabled}
      ref={scrollbarRef}
      className={className}
      onScroll={handleScroll}
    >
      {children}
    </ScrollbarContent>
  );

  if (!advancedMode) {
    return contentNode;
  }
  return (
    <ScrollbarProvider
      scrollbarSize={size}
      scrollShadows={scrollShadows}
      lockScroll={lockScroll}
    >
      <ScrollbarStyled
        $disableOverflowHidden={disableOverflowHidden}
        $disabled={disabled}
        className={scrollbarClassName}
      >
        {contentNode}
        <AnimatePresence>
          {!disabled && (
            <ScrollbarShadows>
              {isLeft && scrollShadows.left}
              {isRight && scrollShadows.right}
              {isTop && scrollShadows.top}
              {isBottom && scrollShadows.bottom}
            </ScrollbarShadows>
          )}
        </AnimatePresence>
      </ScrollbarStyled>
    </ScrollbarProvider>
  );
};

export * from './types';
export * from './context';
export * from './styled';
export * from './shadow';
export * from './style';
