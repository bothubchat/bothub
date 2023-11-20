import React, {
  useCallback, useRef, useState, useEffect
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollbarContent, ScrollbarShadows, ScrollbarStyled } from './styled';
import {
  ScrollbarLockedProps, ScrollbarOverflow, ScrollbarShadowsProps, ScrollbarVariant 
} from './types';
import { ScrollbarProvider } from './context';

export interface ScrollbarProps extends React.PropsWithChildren {
  className?: string;
  scrollbarClassName?: string; 
  variant?: ScrollbarVariant;
  size?: number;
  scrollShadows?: ScrollbarShadowsProps;
  scrollLocked?: ScrollbarLockedProps;
  overflow?: ScrollbarOverflow;
  disabled?: boolean;
  disableShadows?: boolean;
}

export const Scrollbar: React.FC<ScrollbarProps> = ({ 
  className, scrollbarClassName, variant = 'primary', size = 6, scrollShadows, scrollLocked, overflow = 'auto', disabled = false, disableShadows = false, children 
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
    setIsRight(Math.round(scrollLeft) + 1 < scrollWidth - clientWidth);
    setIsTop(scrollTop !== 0);
    setIsBottom(Math.round(scrollTop) + 1 < scrollHeight - clientHeight);

    if (disabled) {
      scrollbarEl.scrollTo(0, 0);
    }
  }, [scrollbarRef, disabled]);

  const lockScroll = useCallback(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
    if (scrollbarEl === null) {
      return;
    }

    if (lockedMode && scrollbarEl !== null) {
      const { side } = scrollLocked;

      switch (side) {
        case 'bottom':
          scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
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
    const scrollTimeout = window.setTimeout(() => {
      handleScroll();
    }, 300);

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
      clearTimeout(scrollTimeout);
      observer.disconnect();
      window.removeEventListener('resize', resizeListener);
    };
  }, [scrollbarRef.current]);

  const contentNode: React.ReactNode = (
    <ScrollbarContent
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $overflow={overflow}
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
      disabled={disabled}
    >
      <ScrollbarStyled
        $overflow={overflow}
        className={scrollbarClassName}
      >
        {contentNode}
        {!disableShadows && (
          <ScrollbarShadows>
            <AnimatePresence>
              {isLeft && scrollShadows.left}
            </AnimatePresence>
            <AnimatePresence>
              {isRight && scrollShadows.right}
            </AnimatePresence>
            <AnimatePresence>
              {isTop && scrollShadows.top}
            </AnimatePresence>
            <AnimatePresence>
              {isBottom && scrollShadows.bottom}
            </AnimatePresence>
          </ScrollbarShadows>
        )}
      </ScrollbarStyled>
    </ScrollbarProvider>
  );
};

export * from './types';
export * from './context';
export * from './styled';
export * from './shadow';
export * from './style';
